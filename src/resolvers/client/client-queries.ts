import { Context } from '../../utils/contexts.js';
import Yup from 'yup';
import { ClientsArgs } from '../../interface/client-interface.js';

export const Query = {
  // Get All Clients
  clients: async (_: unknown, { data }: ClientsArgs, { prisma }: Context) => {
    try {
      const { skip, take, isOrganization } = data;
      return await prisma.client.findMany({
        skip,
        take,
        orderBy: [
          {
            id: 'desc',
          },
        ],
        where: {
          archive: false,
          isOrganization,
        },
        include: {
          projects: true,
          address: true,
          bank: true,
          children_client: true,
          contact_person: true,
          parent_client: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  // Get A client
  client: async (_: unknown, { data }: ClientsArgs, { prisma }: Context) => {
    const { id, take, skip } = data;
    try {
      const validator = Yup.object({
        id: Yup.number().required('ID is required'),
      });

      await validator.validate(data);
      return await prisma.client.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          projects: {
            skip,
            take,
            include: {
              client: true,
              project_requirements: true,
              project_staffs: true,
            },
          },
          address: true,
          bank: true,
          children_client: true,
          contact_person: true,
          parent_client: true,
          offices: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  selectClients: async (_: unknown, __: unknown, { prisma }: Context) => {
    try {
      return await prisma.client.findMany({
        orderBy: [
          {
            id: 'desc',
          },
        ],
        where: {
          archive: false,
          isOrganization: false,
        },
        select: {
          id: true,
          client_name: true,
        },
      });
    } catch (error) {
      return error;
    }
  },
  selectOrganizations: async (_: unknown, __: unknown, { prisma }: Context) => {
    try {
      return await prisma.client.findMany({
        orderBy: [
          {
            id: 'desc',
          },
        ],
        where: {
          archive: false,
          isOrganization: true,
        },
        select: {
          id: true,
          client_name: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  getParentOrganizations: async (
    _: unknown,
    { data }: ClientsArgs,
    { prisma }: Context,
  ) => {
    try {
      const { take, skip } = data;
      return await prisma.client.findMany({
        where: {
          parent_id: null,
          isOrganization: true,
        },
        include: {
          projects: {
            skip,
            take,
            include: {
              client: true,
              project_requirements: true,
              project_staffs: true,
            },
          },
          address: true,
          bank: true,
          children_client: true,
          contact_person: true,
          parent_client: true,
          offices: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  //    Filter clients with search
  filterClient: async (
    _: unknown,
    { data }: ClientsArgs,
    { prisma }: Context,
  ) => {
    const { client_name, isOrganization, archive, skip, take } = data;
    try {
      const response = await prisma.client.findMany({
        orderBy: {
          id: 'desc',
        },
        skip,
        take,
        where: {
          AND: {
            client_name: {
              contains: client_name ? client_name.trim() : undefined,
              mode: 'insensitive',
            },
            archive: archive,
            isOrganization,
          },
        },
        include: {
          address: true,
          bank: true,
          children_client: true,
          contact_person: true,
          offices: true,
          parent_client: {
            include: {
              address: true,
              bank: true,
              children_client: true,
              contact_person: true,
              parent_client: true,
            },
          },
          projects: {
            skip,
            take,
            include: {
              client: true,
              project_requirements: true,
              project_staffs: true,
            },
          },
        },
      });

      const count = await prisma.client.findMany({
        where: {
          AND: {
            client_name: {
              contains: client_name ? client_name.trim() : undefined,
              mode: 'insensitive',
            },
            archive: archive,
            isOrganization,
          },
        },
      });

      return {
        client: response,
        count: count.length,
      };
    } catch (error) {
      return error;
    }
  },

  getMutipleClients: async (
    _: unknown,
    { data }: ClientsArgs,
    { prisma }: Context,
  ) => {
    const { client_ids } = data;
    try {
      const response = await prisma.client.findMany({
        where: {
          id: {
            in: client_ids,
          },
        },
        include: {
          projects: {
            include: {
              project_staffs: true,
              client: true,
              project_requirements: true,
            },
          },
          address: true,
          bank: true,
          contact_person: true,
          offices: true,
        },
      });

      return {
        data: response,
      };
    } catch (error) {
      return error;
    }
  },
};
