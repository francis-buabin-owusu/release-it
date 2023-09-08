import { Context } from '../../utils/contexts.js';
import { OfficeArgs } from '../../interface/office-interface.js';

export const Query = {
  listAllOffices: async (_: unknown, __: unknown, { prisma }: Context) => {
    try {
      return await prisma.office.findMany({
        orderBy: [
          {
            id: 'desc',
          },
        ],
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

  getOffice: async (
    _: unknown,
    { id }: { id: number | string },
    { prisma }: Context,
  ) => {
    try {
      return await prisma.office.findUnique({
        where: {
          id: Number(id),
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

  selectOffices: async (_: unknown, __: unknown, { prisma }: Context) => {
    try {
      return await prisma.office.findMany({
        orderBy: [
          {
            id: 'desc',
          },
        ],
        select: {
          id: true,
          office_name: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  filterOffice: async (
    _: unknown,
    { data }: OfficeArgs,
    { prisma }: Context,
  ) => {
    const { organization_id, city, office_name, archive, skip, take } = data;
    try {
      const response = await prisma.office.findMany({
        orderBy: {
          id: 'desc',
        },
        skip,
        take,
        where: {
          AND: {
            office_name: {
              contains: office_name ? office_name.trim() : undefined,
              mode: 'insensitive',
            },
            archive: archive,
            organization_id,
            city,
          },
        },
        include: {
          organization: {
            include: {
              address: true,
            },
          },
        },
      });

      const count = await prisma.office.findMany({
        where: {
          AND: {
            office_name: {
              contains: office_name ? office_name.trim() : undefined,
              mode: 'insensitive',
            },
            archive: archive,
          },
        },
        include: {
          organization: true,
        },
      });
      return {
        office: response,
        count: count.length,
      };
    } catch (error) {
      return error;
    }
  },
};
