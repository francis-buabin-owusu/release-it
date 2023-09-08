import Yup from 'yup';
import { GraphQLError } from 'graphql';
import { Context } from '../../utils/contexts';
//import { toCapitalizeEachWord } from '../../helpers/text-formatter.js';
import { OfficeArgs } from '../../interface/office-interface';

export const Mutation = {
  // Add Organization Address
  addOffice: async (_: unknown, { data }: OfficeArgs, { prisma }: Context) => {
    const {
      organization_id,
      office_name,
      city,
      created_by,
      website,
      phone_number,
    } = data;
    //const convertName = toCapitalizeEachWord(office_name);
    try {
      // Validate organization info
      await Yup.object({
        organization_id: Yup.number().required('Please Choose an Organization'),
        office_name: Yup.string().required('Enter Office name'),
        country: Yup.string(),
        website: Yup.string(),
        city: Yup.string().required('Enter city'),
        created_by: Yup.number().required('created_by is a required Field'),
        phone_number: Yup.string(),
      }).validate(data);

      const checkName = await prisma.office.findMany({
        where: {
          office_name: office_name,
        },
      });
      if (checkName.length === 0) {
        const response = await prisma.office.create({
          data: {
            office_name: office_name,
            organization_id,
            city,
            created_by,
            website,
            phone_number,
          },
          include: {
            organization: {
              include: {
                offices: true,
              },
            },
          },
        });
        return response;
      } else {
        throw new GraphQLError('Office already exist');
      }
    } catch (error) {
      return error;
    }
  },

  updateOffice: async (
    _: unknown,
    { data }: OfficeArgs,
    { prisma }: Context,
  ) => {
    const {
      id,
      organization_id,
      office_name,
      city,
      created_by,
      website,
      phone_number,
      update_by,
    } = data;

    //const convertName = toCapitalizeEachWord(office_name);
    try {
      // Validate organization info
      await Yup.object({
        office_name: Yup.string(),
        country: Yup.string(),
        website: Yup.string(),
        city: Yup.string(),
        update_by: Yup.number().required('updated_by is a required field'),
      }).validate(data);

      const checkName = await prisma.office.findMany({
        where: {
          office_name: office_name,
        },
      });

      // function to check for Id existance
      const checkId = await prisma.office.findUnique({
        where: {
          id: Number(data.id),
        },
      });

      if (checkId) {
        if (checkName.length !== 0) {
          checkName.forEach((result) => {
            if (result.id !== Number(id)) {
              throw new GraphQLError('Office Name already exist');
            }
          });
        }
        return await prisma.office.update({
          where: {
            id,
          },
          data: {
            office_name: office_name,
            organization_id,
            city,
            created_by,
            website,
            phone_number,
            update_by,
          },
          include: {
            organization: {
              include: {
                address: true,
              },
            },
          },
        });
      } else {
        throw new GraphQLError('Office does not exist');
      }
    } catch (error) {
      return error;
    }
  },

  archiveOffice: async (
    _: unknown,
    { data }: OfficeArgs,
    { prisma }: Context,
  ) => {
    const { id, archive, update_by } = data;

    try {
      // declare validation schema
      await Yup.object({
        id: Yup.number().required('ID is required'),
        update_by: Yup.number(),
      }).validate(data);

      return await prisma.office.update({
        where: { id },
        data: {
          archive,
          update_by,
          archived_at: new Date(),
        },
        include: {
          organization: {
            include: {
              address: true,
            },
          },
        },
      });
    } catch (error) {
      return error;
    }
  },
};
