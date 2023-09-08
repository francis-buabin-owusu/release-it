import { Context } from '../../utils/contexts.js';
import Yup, { string } from 'yup';
import { GraphQLError } from 'graphql';
import { sendEmail } from '../../utils/send-mail/send-mail.js';
import { confirmStaffEmail } from '../../helpers/email-service/html-templates/confirm-staff-html.js';
import { Encrypt } from '../../utils/jwt-decoder.js';
import { addSixMonths, formatDate } from '../../helpers/date-formatter.js';
import { removeStaffEmail } from '../../helpers/email-service/html-templates/remove-staff-html.js';
import {
  ProjectArgs,
  removeStaffArgs,
  addMoreStaffArgs,
  bulkStaffConfirmationArgs,
  staffConfirmationArgs,
} from '../../interface/project-interface.js';

export const Mutation = {
  // Add project
  addProject: async (
    _: unknown,
    { data }: ProjectArgs,
    { prisma }: Context,
  ) => {
    const {
      name,
      description,
      client_id,
      business_manager_id,
      technical_manager_id,
      project_confirmation_status,
      project_status,
      start_date,
      end_date,
      created_by,
      requirements,
      staffs,
    } = data;

    try {
      // Validate Project info
      await Yup.object({
        name: Yup.string().required(`Enter Project Name`).min(1).max(50).trim(),
        description: string().max(200),
        created_by: Yup.number(),
        client_id: Yup.number().required('Select a client'),
        business_manager_id: Yup.number(),
        technical_manager_id: Yup.number(),
        project_confirmation_status: Yup.boolean(),
        project_status: Yup.string(),
        requirements: Yup.array(
          Yup.object({
            skill_ids: Yup.array().min(
              1,
              "Important: The project's required skills cannot be empty",
            ),
            specialization_id: Yup.number().min(
              1,
              "Important: The project's required specializations cannot be empty",
            ),
            employees_required: Yup.number().min(
              1,
              'Employees required must be at least one',
            ),
          }),
        ).min(1, 'Project requirement cannot be empty'),
        staffs: Yup.array(
          Yup.object({
            user_id: Yup.number().min(
              1,
              'Employees selected must be at least one',
            ),
          }),
        ).min(1, 'Employees selected must be at least one'),
      }).validate(data);

      // function to check existance of skill name
      const check = await prisma.project.findMany({
        where: { name: name.trim() },
      });

      if (check.length === 0) {
        return await prisma.project.create({
          data: {
            name: name.trim(),
            description,
            client_id,
            business_manager_id,
            technical_manager_id,
            project_confirmation_status,
            project_status,
            created_by,
            start_date: new Date(start_date),
            end_date: end_date ? new Date(end_date) : null,
            project_requirements: {
              create: requirements.map((requirement) => ({
                specialization: {
                  connect: {
                    id: requirement['specialization_id'],
                  },
                },
                position_id: requirement['position_id'],
                required_skills: {
                  create: requirement['skill_ids'].map((skill_id) => ({
                    skill: {
                      connect: {
                        id: skill_id,
                      },
                    },
                  })),
                },
                employees_required: requirement['employees_required'],
              })),
            },
            project_staffs: {
              create: staffs.map((staff) => ({
                staff: {
                  connectOrCreate: {
                    where: {
                      user_id: staff.user_id,
                    },
                    create: {
                      user_id: staff.user_id,
                    },
                  },
                },
              })),
            },
          },
          include: {
            project_requirements: {
              include: {
                specialization: true,
                required_skills: {
                  include: {
                    skill: true,
                  },
                },
              },
            },
            project_staffs: {
              include: {
                staff: true,
              },
            },
          },
        });
      } else {
        throw new GraphQLError(`Project already exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Update Project
  updateProject: async (
    _: unknown,
    { data }: ProjectArgs,
    { prisma }: Context,
  ) => {
    const {
      id,
      name,
      description,
      client_id,
      business_manager_id,
      technical_manager_id,
      start_date,
      end_date,
      project_status,
      project_confirmation_status,
      project_staffing_status,
      updated_by,
      suspensionReason,
      terminationReason,
    } = data;

    try {
      // Validate Project info
      await Yup.object({
        id: Yup.number().required('Project ID is required'),
        name: Yup.string()
          .min(1)
          .max(50, 'Project name must not exceed 50 characters')
          .trim(),
        description: string()
          .min(1)
          .max(200, 'Project description must not exceed 200 characters'),
        client_id: Yup.number(),
        business_manager_id: Yup.number(),
        technical_manager_id: Yup.number(),
        updated_by: Yup.number().required(),
      }).validate(data);

      // function to check existance of id
      const checkID = await prisma.project.findUnique({
        where: {
          id: Number(id),
        },
      });

      const checkNameResult = await prisma.project.findMany({
        where: {
          name: name.trim(),
        },
      });

      // function to change the employee status on project upon status change
      if (
        data.project_status === 'Suspended' ||
        data.project_status === 'Terminated' ||
        data.project_status === 'Completed'
      ) {
        const project_staffs = await prisma.project_staffs.findMany({
          where: {
            project_id: Number(id),
          },
        });

        project_staffs.map(async (p) => {
          await prisma.project_staffs.update({
            where: {
              id: p.id,
            },
            data: {
              active: false,
              project_end_date: p.project_end_date
                ? p.project_end_date
                : new Date(),
            },
          });
        });
      }

      if (checkID) {
        if (checkNameResult.length !== 0) {
          checkNameResult.forEach((result) => {
            if (result.id !== Number(id)) {
              throw new GraphQLError(
                `Project already exist, rename and try again`,
              );
            }
          });
        }
        return await prisma.project.update({
          where: {
            id: Number(id),
          },
          data: {
            name: name.trim(),
            description,
            client_id,
            business_manager_id,
            technical_manager_id,
            start_date: start_date ? new Date(start_date) : null,
            end_date: end_date ? new Date(end_date) : null,
            updated_by,
            updated_at: new Date(),
            project_status,
            project_confirmation_status,
            project_staffing_status,
            suspensionReason,
            terminationReason,
          },
          include: {
            project_requirements: {
              include: {
                specialization: true,
                required_skills: {
                  include: {
                    skill: true,
                  },
                },
              },
            },
            project_staffs: {
              include: {
                staff: true,
              },
            },
          },
        });
      } else {
        throw new GraphQLError(`Project does not exist`);
      }
    } catch (error) {
      return error;
    }
  },

  archiveProject: async (
    _: unknown,
    { data }: ProjectArgs,
    { prisma }: Context,
  ) => {
    const { id, archive, updated_by } = data;
    try {
      // Validate id
      const yupValidator = Yup.object({
        id: Yup.number().required(`Project ID is required`),
        updated_by: Yup.number(),
      });

      await yupValidator.validate(data);

      const checkID = await prisma.project.findUnique({
        where: {
          id: Number(id),
        },
      });

      // function to change the employee status on project upon removal
      if (data.archive === true) {
        const project_staffs = await prisma.project_staffs.findMany({
          where: {
            project_id: Number(id),
          },
        });

        project_staffs.map(async (p) => {
          await prisma.project_staffs.update({
            where: {
              id: p.id,
            },
            data: {
              active: false,
              project_end_date: p.project_end_date
                ? p.project_end_date
                : new Date(),
            },
          });
        });
      }

      if (checkID) {
        return prisma.project.update({
          where: {
            id: Number(id),
          },
          data: {
            archive,
            updated_by,
          },
        });
      } else {
        throw new GraphQLError(`Project does not exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Confirm a suggested staff
  confirmStaff: async (
    _: unknown,
    { data }: staffConfirmationArgs,
    { prisma }: Context,
  ) => {
    try {
      const {
        id,
        billability_status,
        confirmation_status,
        project_hours,
        role,
        project_start_date,
        project_end_date,
        employee_email,
        employee_name,
        technical_manager_name,
        business_manager_name,
      } = data;

      // Validate confirmation info
      await Yup.object({
        id: Yup.number().required(`ID is required`),
        billability_status: Yup.string().required(
          `Select a Billability Status`,
        ),
        confirmation_status: Yup.string().required(
          `Select a Confirmation Status`,
        ),
        project_hours: Yup.number()
          .required(`Enter project hours`)
          .min(1, 'Project hours must be at least 1hr')
          .max(8, 'Project hours must be at most 8hrs'),
        role: Yup.string().required(`Select a Role`),
      }).validate(data);

      // function to check existence of id
      const check = await prisma.project_staffs.findUnique({
        where: {
          id: Number(id),
        },
      });

      // throw an error if id does not exist in database
      if (check === undefined || check === null) {
        throw new GraphQLError(`ID does not exist`);
      }

      // find project that matches the id
      const projectInfo = await prisma.project.findUnique({
        where: {
          id: check.project_id,
        },
        include: {
          project_requirements: true,
          project_staffs: true,
        },
      });

      // set confirmation detail for staff allocated to the project
      const updatedProjectStaff = await prisma.project_staffs.update({
        where: {
          id: Number(id),
        },
        data: {
          billability_status,
          confirmation_status,
          project_hours,
          role,
          active: confirmation_status === 'Confirmed' ? true : false,
          project_start_date: project_start_date
            ? new Date(project_start_date)
            : projectInfo.start_date,
          project_end_date: project_end_date
            ? new Date(project_end_date)
            : projectInfo.end_date
            ? projectInfo.end_date
            : new Date(addSixMonths(`${projectInfo.start_date}`)),
        },
        include: {
          project: true,
          staff: true,
        },
      });

      // calculate total number of required employees
      // let requiredStaffNumber = 0;
      // projectInfo.project_requirements.forEach((requirement) => {
      //   requiredStaffNumber += requirement.employees_required;
      // });

      // // calculate the number of confirmed staff on project
      // let confirmatedStaffNumber = 0;
      // projectInfo.project_staffs.forEach((staff) => {
      //   if (staff.confirmation_status === 'Confirmed') {
      //     confirmatedStaffNumber++;
      //   }
      // });

      // // Determine project Staffing status
      // if (confirmatedStaffNumber >= requiredStaffNumber) {
      //   await prisma.project.update({
      //     where: {
      //       id: check.project_id,
      //     },
      //     data: {
      //       project_staffing_status: 'Completed',
      //     },
      //   });
      // } else if (
      //   confirmatedStaffNumber > 0 &&
      //   confirmatedStaffNumber < requiredStaffNumber
      // ) {
      //   await prisma.project.update({
      //     where: {
      //       id: check.project_id,
      //     },
      //     data: {
      //       project_staffing_status: 'Awaiting_Confirmation',
      //     },
      //   });
      // } else {
      //   await prisma.project.update({
      //     where: {
      //       id: check.project_id,
      //     },
      //     data: {
      //       project_staffing_status: 'Not_Started',
      //     },
      //   });
      // }

      const sendDetails = {
        employee: employee_name,
        projectName: updatedProjectStaff.project.name,
        role: updatedProjectStaff.role,
        startDate: formatDate(`${updatedProjectStaff.project_start_date}`),
        endDate: formatDate(`${updatedProjectStaff.project_end_date}`),
        user_id: Encrypt(`${updatedProjectStaff.staff_id}`).replace('/', '%2F'),
        technical_manager_name: technical_manager_name,
        business_manager_name: business_manager_name,
      };

      if (
        check.confirmation_status === 'Unconfirmed' &&
        confirmation_status === 'Confirmed'
      ) {
        sendEmail(
          confirmStaffEmail(sendDetails),
          employee_email,
          `You are confirmed for a new project - ${updatedProjectStaff.project.name}`,
        );
      }

      return updatedProjectStaff;
    } catch (error) {
      return error;
    }
  },

  // Confirm bulk of suggested staffs
  bulkStaffConfirm: async (
    _: unknown,
    { data }: bulkStaffConfirmationArgs,
    { prisma }: Context,
  ) => {
    // destructure confirmationDetails from bulkStaffConfirmationArgs
    const { confirmationDetails } = data;

    try {
      // Validate Project info
      await Yup.object({
        confirmationDetails: Yup.array(
          Yup.object({
            id: Yup.number().required(`ID is required`),
            billability_status: Yup.string(),
            confirmation_status: Yup.string(),
            project_hours: Yup.number()
              .min(0, 'Project hours must be at least 0hr')
              .max(8, 'Project hours must be at most 8hrs'),
            role: Yup.string(),
          }),
        ).min(1, 'confirmationDetails cannot be empty'),
      }).validate(data);

      return confirmationDetails.map(async (confirmationDetail) => {
        // function to check existance of skill name
        const check = await prisma.project_staffs.findUnique({
          where: {
            id: Number(confirmationDetail.id),
          },
        });

        if (check === undefined || check === null) {
          throw new GraphQLError(`id does not exists`);
        }

        // find project that matches the id
        const projectInfo = await prisma.project.findUnique({
          where: {
            id: check.project_id,
          },
          include: {
            project_requirements: true,
            project_staffs: true,
          },
        });

        const updatedProjectStaff = await prisma.project_staffs.update({
          where: {
            id: Number(confirmationDetail.id),
          },
          data: {
            billability_status: confirmationDetail.billability_status,
            confirmation_status: confirmationDetail.confirmation_status,
            project_hours: confirmationDetail.project_hours,
            role: confirmationDetail.role,
            active:
              confirmationDetail.confirmation_status === 'Confirmed'
                ? true
                : false,
            project_start_date: confirmationDetail.project_start_date
              ? new Date(confirmationDetail.project_start_date)
              : projectInfo.start_date,
            // project_end_date: confirmationDetail.project_end_date
            //   ? new Date(confirmationDetail.project_end_date)
            //   : confirmationDetail.project_start_date
            //   ? new Date(addSixMonths(confirmationDetail.project_start_date))
            //   : new Date(addSixMonths(`${projectInfo.start_date}`)),
            project_end_date: confirmationDetail.project_end_date
              ? new Date(confirmationDetail.project_end_date)
              : projectInfo.end_date
              ? projectInfo.end_date
              : new Date(addSixMonths(`${projectInfo.start_date}`)),
          },
          include: {
            project: true,
            staff: true,
          },
        });

        // calculate total number of required employees
        // let requiredStaffNumber = 0;
        // projectInfo.project_requirements.forEach((requirement) => {
        //   requiredStaffNumber += requirement.employees_required;
        // });

        // // calculate the number of confirmed staff on project
        // let confirmatedStaffNumber = 0;
        // projectInfo.project_staffs.forEach((staff) => {
        //   if (staff.confirmation_status === 'Confirmed') {
        //     confirmatedStaffNumber++;
        //   }
        // });

        // // Determine project Staffing status
        // if (confirmatedStaffNumber >= requiredStaffNumber) {
        //   await prisma.project.update({
        //     where: {
        //       id: check.project_id,
        //     },
        //     data: {
        //       project_staffing_status: 'Completed',
        //     },
        //   });
        // } else if (
        //   confirmatedStaffNumber > 0 &&
        //   confirmatedStaffNumber < requiredStaffNumber
        // ) {
        //   await prisma.project.update({
        //     where: {
        //       id: check.project_id,
        //     },
        //     data: {
        //       project_staffing_status: 'Awaiting_Confirmation',
        //     },
        //   });
        // } else {
        //   await prisma.project.update({
        //     where: {
        //       id: check.project_id,
        //     },
        //     data: {
        //       project_staffing_status: 'Not_Started',
        //     },
        //   });
        // }

        const sendDetails = {
          employee: confirmationDetail.employee_name,
          projectName: updatedProjectStaff.project.name,
          role: confirmationDetail.role,
          startDate: formatDate(`${updatedProjectStaff.project_start_date}`),
          endDate: formatDate(`${updatedProjectStaff.project_end_date}`),
          user_id: Encrypt(`${updatedProjectStaff.staff_id}`).replace(
            '/',
            '%2F',
          ),
          technical_manager_name: confirmationDetail.technical_manager_name,
          business_manager_name: confirmationDetail.business_manager_name,
        };

        if (
          check.confirmation_status === 'Unconfirmed' &&
          confirmationDetail.confirmation_status === 'Confirmed'
        ) {
          sendEmail(
            confirmStaffEmail(sendDetails),
            confirmationDetail.employee_email,
            `You are confirmed for a new project - ${updatedProjectStaff.project.name}`,
          );
        }

        return updatedProjectStaff;
      });
    } catch (error) {
      return error;
    }
  },

  // Remove an allocated staff from a project
  removeStaff: async (
    _: unknown,
    { data }: removeStaffArgs,
    { prisma }: Context,
  ) => {
    // destructure id from data
    const { id, employee_email, employee_name } = data;

    try {
      // Validate id
      await Yup.object({
        id: Yup.number().required(`ID is required`),
      }).validate(data);

      // check if id exists
      const check = await prisma.project_staffs.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (check === undefined || check === null) {
        throw new GraphQLError(`ID does not exist`);
      }

      if (check.confirmation_status === 'Unconfirmed' && !check.active) {
        const response = await prisma.project_staffs.delete({
          where: {
            id,
          },
        });
        return response;
      } else {
        const response = await prisma.project_staffs.update({
          where: {
            id,
          },
          data: {
            active: false,
            project_end_date:
              check.confirmation_status === 'Confirmed' ? new Date() : null,
          },
          include: {
            project: true,
          },
        });

        const sendDetails = {
          employee: employee_name,
          projectName: response.project.name,
        };

        if (response.confirmation_status === 'Confirmed') {
          sendEmail(
            removeStaffEmail(sendDetails),
            employee_email,
            `Project Update - ${response.project.name}`,
          );
        }
        return response;
      }
    } catch (error) {
      return error;
    }
  },

  addMoreStaffToProject: async (
    _: unknown,
    { data }: addMoreStaffArgs,
    { prisma }: Context,
  ) => {
    const { project_id, staff_id } = data;

    try {
      // Check if Project_id exists
      const checkProjectId = await prisma.project.findMany({
        where: {
          id: Number(project_id),
        },
      });

      // Check if staff_id exists
      const staffExist = await prisma.staff.findUnique({
        where: {
          user_id: Number(staff_id),
        },
      });

      // Check if staff is already added to the project
      const alreadyStaffedOnProject = await prisma.project_staffs.findMany({
        where: {
          project_id: Number(project_id),
          staff_id: Number(staff_id),
        },
      });

      if (checkProjectId.length !== 0) {
        if (staffExist) {
          if (alreadyStaffedOnProject.length === 0) {
            return await prisma.project_staffs.create({
              data: {
                project_id,
                staff_id,
              },
            });
          } else {
            throw new GraphQLError(
              `This staff is already added to this project`,
            );
          }
        } else {
          await prisma.staff.create({
            data: {
              user_id: staff_id,
            },
          });

          return await prisma.project_staffs.create({
            data: {
              project_id,
              staff_id,
            },
          });
        }
      } else {
        throw new GraphQLError(`Project does not exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Remove staff from all projects
  removeDeactivatedStaff: async (
    _: unknown,
    { user_id }: { user_id: number | string },
    { prisma }: Context,
  ) => {
    try {
      // check if id exists
      const check = await prisma.project_staffs.findMany({
        where: {
          staff_id: Number(user_id),
        },
      });

      if (check.length === 0) {
        return {
          message: 'User deactivated successfully',
        };
      }
      if (check) {
        await prisma.project_staffs.deleteMany({
          where: {
            staff_id: Number(user_id),
          },
        });
      }

      return {
        message: 'User deactivated successfully',
      };
    } catch (error) {
      return error;
    }
  },

  updateProjectStatus: async (
    _: unknown,
    { data }: ProjectArgs,
    { prisma }: Context,
  ) => {
    const { id, project_status } = data;
    try {
      await Yup.object({
        id: Yup.number().required(`id is a required field`),
      }).validate(data);
      const response = await prisma.project.update({
        where: {
          id: Number(id),
        },
        data: {
          project_status,
        },
        include: {
          client: true,
          project_requirements: true,
          project_staffs: true,
        },
      });

      // function to change the employee status on project upon status change
      if (
        data.project_status === 'Suspended' ||
        data.project_status === 'Terminated' ||
        data.project_status === 'Completed'
      ) {
        const project_staffs = await prisma.project_staffs.findMany({
          where: {
            project_id: Number(id),
          },
        });

        project_staffs.map(async (p) => {
          await prisma.project_staffs.update({
            where: {
              id: p.id,
            },
            data: {
              active: false,
              project_end_date: p.project_end_date
                ? p.project_end_date
                : new Date(),
            },
          });
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  },

  updateProjectConfirmationStatus: async (
    _: unknown,
    { data }: ProjectArgs,
    { prisma }: Context,
  ) => {
    const { id, project_confirmation_status } = data;

    try {
      await Yup.object({
        id: Yup.number().required(`ID is required`),
      }).validate(data);

      const response = await prisma.project.update({
        where: {
          id: Number(id),
        },
        data: {
          project_confirmation_status,
        },
        include: {
          client: true,
          project_requirements: true,
          project_staffs: true,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  },

  updateProjectStaffingStatus: async (
    _: unknown,
    { data }: ProjectArgs,
    { prisma }: Context,
  ) => {
    const { id, project_staffing_status } = data;

    try {
      await Yup.object({
        id: Yup.number().required(`ID is required`),
      }).validate(data);

      const response = await prisma.project.update({
        where: {
          id: Number(id),
        },
        data: {
          project_staffing_status,
        },
        include: {
          client: true,
          project_requirements: true,
          project_staffs: true,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
};
