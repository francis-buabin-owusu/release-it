import { Context } from '../../utils/contexts.js';
import Yup from 'yup';
import {
  ProjectArgs,
  filterProjectArgs,
  filterProjectDetails,
} from '../../interface/project-interface.js';

export const Query = {
  // get all projects
  projects: async (_: unknown, { data }: ProjectArgs, { prisma }: Context) => {
    const { skip, take } = data;

    try {
      return await prisma.project.findMany({
        orderBy: {
          id: 'desc',
        },
        skip,
        take,
        include: {
          client: true,
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
    } catch (error) {
      return error;
    }
  },

  // get a project
  project: async (_: unknown, { data }: ProjectArgs, { prisma }: Context) => {
    const { id, skip, take } = data;
    try {
      await Yup.object({
        id: Yup.number().required('Project ID is required'),
      }).validate(data);

      return await prisma.project.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          client: true,
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
            skip,
            take,
            include: {
              staff: true,
            },
          },
        },
      });
    } catch (error) {
      return error;
    }
  },

  // Get Multiple projects
  getMultipleProjects: async (
    _: unknown,
    { data }: ProjectArgs,
    { prisma }: Context,
  ) => {
    const { project_ids } = data;
    try {
      const response = await prisma.project.findMany({
        where: {
          id: {
            in: project_ids,
          },
        },
        include: {
          client: true,
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
      return {
        data: response,
      };
    } catch (error) {
      return error;
    }
  },

  user_on_project: async (
    _: unknown,
    { id }: { id: number | string },
    { prisma }: Context,
  ) => {
    try {
      return await prisma.project_staffs.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          staff_id: Number(id),
        },
        include: {
          project: true,
          staff: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  searchProject: async (
    _: unknown,
    { name }: { name: string },
    { prisma }: Context,
  ) => {
    try {
      return await prisma.project.findMany({
        where: {
          name: {
            contains: name ? name.trim() : undefined,
            mode: 'insensitive',
          },
        },
      });
    } catch (error) {
      return error;
    }
  },

  filterProjectStatus: async (
    _: unknown,
    { data }: filterProjectDetails,
    { prisma }: Context,
  ) => {
    const {
      confirmation_status,
      staffing_status,
      project_status,
      skip,
      take,
      name,
      archive,
      client_id,
    } = data;
    try {
      const response = await prisma.project.findMany({
        skip,
        take,
        orderBy: {
          id: 'desc',
        },
        where: {
          AND: {
            name: {
              contains: name ? name.trim() : undefined,
              mode: 'insensitive',
            },
            archive,
            project_staffing_status: staffing_status,
            project_status: project_status,
            project_confirmation_status: confirmation_status,
            client_id,
          },
        },
        include: {
          client: true,
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
      const count = await prisma.project.findMany({
        where: {
          AND: {
            archive,
            project_staffing_status: staffing_status,
            project_status: project_status,
            project_confirmation_status: confirmation_status,
            client_id,
            name: {
              contains: name ? name.trim() : undefined,
              mode: 'insensitive',
            },
          },
        },
      });
      return {
        project: response,
        count: count.length,
      };
    } catch (error) {
      return error;
    }
  },

  filterProjectDetails: async (
    _: unknown,
    { data }: filterProjectArgs,
    { prisma }: Context,
  ) => {
    const {
      project_id,
      billability_status,
      confirmation_status,
      role,
      active,
      skip,
      take,
    } = data;
    try {
      const response = await prisma.project_staffs.findMany({
        where: {
          project_id: Number(project_id),
          billability_status,
          confirmation_status,
          role,
          active,
        },
        include: {
          project: {
            include: {
              project_staffs: {
                skip,
                take,
                include: {
                  staff: true,
                },
              },
              client: {
                include: {
                  address: true,
                  bank: true,
                  children_client: true,
                  contact_person: true,
                  parent_client: true,
                  projects: true,
                },
              },
              project_requirements: {
                include: {
                  required_skills: {
                    include: {
                      required_skills: true,
                      skill: true,
                    },
                  },
                  specialization: true,
                },
              },
            },
          },
          staff: true,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  },

  filterProjectDetailsWithStaff: async (
    _: unknown,
    { data }: filterProjectArgs,
    { prisma }: Context,
  ) => {
    const {
      project_id,
      billability_status,
      confirmation_status,
      role,
      active,
      skip,
      take,
    } = data;
    try {
      const project_response = await prisma.project.findUnique({
        where: {
          id: Number(project_id),
        },
        include: {
          client: {
            include: {
              address: true,
              bank: true,
              children_client: true,
              contact_person: true,
              parent_client: true,
              projects: true,
            },
          },
          project_requirements: {
            include: {
              project: true,
              required_skills: {
                include: {
                  skill: true,
                },
              },
              specialization: true,
            },
          },
          project_staffs: true,
        },
      });
      const staff_response = await prisma.project_staffs.findMany({
        where: {
          AND: {
            project_id: Number(project_id),
            billability_status,
            confirmation_status,
            role,
            active,
          },
        },
        skip,
        take,
        include: {
          project: {
            include: {
              project_staffs: {
                include: {
                  staff: true,
                },
              },
              client: {
                include: {
                  address: true,
                  bank: true,
                  children_client: true,
                  contact_person: true,
                  parent_client: true,
                  projects: true,
                },
              },
              project_requirements: {
                include: {
                  required_skills: {
                    include: {
                      skill: true,
                    },
                  },
                  specialization: true,
                },
              },
            },
          },
          staff: true,
        },
      });

      const count = await prisma.project_staffs.findMany({
        where: {
          AND: {
            project_id: Number(project_id),
            billability_status,
            confirmation_status,
            role,
            active,
          },
        },
      });
      return {
        project: project_response,
        project_staffs: staff_response,
        count: count.length,
      };
    } catch (error) {
      return error;
    }
  },

  globalStaffing: async (_: unknown, __: unknown, { prisma }: Context) => {
    try {
      const staffs = await prisma.staff.findMany({
        orderBy: {
          id: 'desc',
        },
        include: {
          staff_projects: {
            include: {
              project: {
                include: {
                  client: true,
                },
              },
            },
          },
        },
      });

      const t = staffs.map((staff) => {
        const currentProjects = [];
        const proposedProjects = [];
        const previousProjects = [];
        const sortedCurrentProjects = [];
        let utilizationHours = 0;
        let twoMonthsAvailability = true;
        let billability = false;

        // const nowTimeStamp = Math.floor(Date.now() / 1000);
        const twoMonthsFromNow = new Date(
          new Date().getTime() + 2 * 4 * 7 * 24 * 60 * 60 * 1000,
        );
        const twoMonthsTimeStamp = Math.floor(
          twoMonthsFromNow.getTime() / 1000,
        );
        let endTimeStamp;

        if (staff.staff_projects.length === 0) {
          twoMonthsAvailability = true;
        }

        staff.staff_projects.forEach((staff_project) => {
          if (staff_project.confirmation_status == 'Confirmed') {
            if (staff_project.active) {
              sortedCurrentProjects.push(staff_project);
              utilizationHours += staff_project.project_hours;

              if (staff_project.project_end_date) {
                const endDateString = staff_project.project_end_date;
                const endDate = new Date(endDateString);
                endTimeStamp = Math.floor(endDate.getTime() / 1000);

                if (endTimeStamp >= twoMonthsTimeStamp) {
                  twoMonthsAvailability = false;
                }
              }
            } else if (!staff_project.active) {
              previousProjects.push(staff_project);
              // if (utilizationHours <= 8) {
              //   console.log(utilizationHours);
              //   twoMonthsAvailability = true;
              // }
            }
          } else {
            proposedProjects.push(staff_project);
            // if (utilizationHours < 8) {
            //   twoMonthsAvailability = true;
            // } else {
            //   twoMonthsAvailability = false;
            // }
          }
        });
        // Group staff's current projects into primary and secondary projects
        const primary = [];
        const secondary = [];

        let maxHours = 0;
        let oldestStartDate = new Date(0);

        let selectedProject = null;

        for (const project of sortedCurrentProjects) {
          if (
            project.project_hours > maxHours ||
            (project.project_hours === maxHours &&
              new Date(project.project_start_date) < oldestStartDate)
          ) {
            //Move previously selected project to secondary project
            if (selectedProject) {
              secondary.push(selectedProject);
            }
            maxHours = project.project_hours;
            oldestStartDate = new Date(project.project_start_date);
            selectedProject = project;
          } else {
            secondary.push(project);
          }
        }

        if (selectedProject) {
          primary.push(selectedProject);
        }

        currentProjects['primaryProject'] = primary;
        currentProjects['secondaryProject'] = secondary;

        // Billability
        for (const project of sortedCurrentProjects) {
          if (project.billability_status === 'Billable') {
            billability = true;
            break;
          }
        }

        const utilizationFraction = utilizationHours / 8;
        const utilizationPercentage = Math.floor(utilizationFraction * 100);
        const availabilityPercentage = Math.floor(100 - utilizationPercentage);
        return {
          user_id: staff.user_id,
          utilizationPercentage,
          availabilityPercentage,
          twoMonthsAvailability,
          billability,
          currentProjects,
          proposedProjects,
          previousProjects,
        };
      });

      return t;
    } catch (error) {
      return error;
    }
  },

  userCurrentProject: async (
    _: unknown,
    { userId }: { userId: number | string },
    { prisma }: Context,
  ) => {
    try {
      const data = await prisma.project_staffs.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          staff_id: Number(userId),
        },
        include: {
          project: {
            include: {
              project_staffs: {
                include: {
                  project: true,
                  staff: true,
                },
              },
              project_requirements: {
                include: {
                  required_skills: {
                    include: {
                      skill: true,
                    },
                  },
                  specialization: true,
                },
              },
            },
          },
        },
      });

      const currentProjects = [];
      const previousProjects = [];
      const proposedProjects = [];

      data.forEach((projectData) => {
        if (projectData.confirmation_status == 'Confirmed') {
          if (projectData.active) {
            currentProjects.push(projectData);
          } else if (!projectData.active) {
            previousProjects.push(projectData);
          }
        } else {
          proposedProjects.push(projectData);
        }
      });

      const staffData = await prisma.staff.findUnique({
        where: {
          user_id: Number(userId),
        },
        include: {
          staff_projects: {
            include: {
              project: true,
              staff: true,
            },
          },
        },
      });
      let totalProjectHours = 0;

      currentProjects.forEach((element) => {
        const projectHours = element.project_hours;
        if (projectHours !== null) {
          totalProjectHours += projectHours;
        }
      });

      const remainingHours = 8 - totalProjectHours;

      return {
        staff: staffData,
        availableHours: remainingHours,
        currentProjects: currentProjects,
        previousProjects: previousProjects,
        proposedProjects: proposedProjects,
      };
    } catch (error) {
      return error;
    }
  },

  getManagerProject: async (
    _: unknown,
    { userId }: { userId: number | string },
    { prisma }: Context,
  ) => {
    try {
      const data = await prisma.project.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          technical_manager_id: Number(userId),
        },
      });
      return {
        data: data,
      };
    } catch (error) {
      return error;
    }
  },

  selectProjects: async (_: unknown, __: unknown, { prisma }: Context) => {
    try {
      return await prisma.project.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          archive: false,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
