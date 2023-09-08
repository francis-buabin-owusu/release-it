import { Context } from '../../utils/contexts.js';
import Yup from 'yup';
import { GraphQLError } from 'graphql';
import { ClientsArgs } from '../../interface/client-interface.js';

export const Mutation = {
  // Add A client Resolver
  addClient: async (_: unknown, { data }: ClientsArgs, { prisma }: Context) => {
    const {
      client_name,
      description,
      parent_id,
      currency,
      time_zone,
      website,
      logo,
      isOrganization,
      created_by,
      country,
      state_region,
      city,
      street_address,
      zip_code,
      bank_name,
      account_name,
      account_number,
      branch,
      swift_key,
      contact_person,
    } = data;

    try {
      await Yup.object({
        client_name: Yup.string()
          .required('Enter Client name')
          .max(50)
          .min(1)
          .trim(),
        website: Yup.string().trim(),
        logo: Yup.string(),
        created_by: Yup.number().required('created_by is required'),
      }).validate(data);

      // check if the name already exists in the database
      const checkCLient = await prisma.client.findMany({
        where: {
          AND: {
            client_name: client_name.trim(),
            isOrganization,
          },
        },
      });

      if (checkCLient.length === 0) {
        return await prisma.client.create({
          data: {
            client_name: client_name.trim(),
            description,
            parent_id,
            currency,
            website,
            logo,
            isOrganization,
            created_by,
            address: {
              create: {
                country,
                state_region,
                city,
                street_address,
                zip_code,
                time_zone,
              },
            },
            bank: {
              create: {
                bank_name,
                account_name,
                account_number,
                branch,
                swift_key,
              },
            },
            contact_person: {
              createMany: {
                data: contact_person,
              },
            },
          },
          include: {
            address: true,
            bank: true,
            children_client: true,
            contact_person: true,
            parent_client: true,
            projects: true,
          },
        });
      } else {
        throw new GraphQLError(`Client already exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Update client Resolver
  updateClient: async (
    _: unknown,
    { data }: ClientsArgs,
    { prisma }: Context,
  ) => {
    const {
      id,
      client_name,
      description,
      parent_id,
      currency,
      time_zone,
      website,
      logo,
      isOrganization,
      update_by,
      country,
      state_region,
      city,
      street_address,
      zip_code,
      bank_name,
      account_name,
      account_number,
      branch,
      swift_key,
      contact_person,
    } = data;

    try {
      await Yup.object({
        id: Yup.string().required('ID is required'),
        client_name: Yup.string().max(50).min(1).trim(),
        website: Yup.string().trim(),
        logo: Yup.string(),
        updated_by: Yup.number(),
      }).validate(data);

      // check for Id existance in the database
      const checkId = await prisma.client.findUnique({
        where: { id: Number(id) },
      });

      if (checkId) {
        return await prisma.client.update({
          where: {
            id: Number(id),
          },
          data: {
            client_name,
            description,
            parent_id,
            currency,
            website,
            logo,
            isOrganization,
            updated_by: update_by,
            updated_at: new Date(),
            address: {
              update: {
                country,
                state_region,
                city,
                street_address,
                zip_code,
                time_zone,
              },
            },
            bank: {
              update: {
                bank_name,
                account_name,
                account_number,
                branch,
                swift_key,
              },
            },
            contact_person: {
              deleteMany: {
                client_id: Number(id),
              },
              createMany: {
                data: contact_person,
              },
            },
          },
        });
      } else {
        throw new GraphQLError(`Client does not exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Archive Client Resolver
  archiveClient: async (
    _: unknown,
    { data }: ClientsArgs,
    { prisma }: Context,
  ) => {
    const { id, update_by, archive } = data;

    try {
      await Yup.object({
        id: Yup.number().required(`ID is required`),
        updated_by: Yup.number().required(`updated_by is a required field`),
      }).validate(data);

      const check = await prisma.client.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (check) {
        return await prisma.client.update({
          where: {
            id: Number(id),
          },
          data: {
            archive,
            archived_at: new Date(),
            updated_by: update_by,
          },
          include: {
            address: true,
            bank: true,
            children_client: true,
            contact_person: true,
            parent_client: true,
            projects: true,
          },
        });
      } else {
        throw new GraphQLError(`Client does not exist`);
      }
    } catch (error) {
      return error;
    }
  },
};
