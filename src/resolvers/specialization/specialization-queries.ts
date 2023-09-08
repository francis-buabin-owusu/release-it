import { Context } from '../../utils/contexts.js';
import Yup from 'yup';
import { SpecializationArgs } from '../../interface/specialization-interface.js';

export const Query = {
  // Get All specializations
  specializations: async (
    _: unknown,
    { data }: SpecializationArgs,
    { prisma }: Context,
  ) => {
    const { skip, take } = data;
    try {
      return await prisma.specialization.findMany({
        skip,
        take,
        orderBy: [
          {
            id: 'desc',
          },
        ],
        where: {
          archive: false,
        },
        include: {
          skills: {
            where: {
              archive: false,
            },
          },
          project_requirements: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  // Get Specialization By Id
  getSpecialization: async (
    _: unknown,
    { data }: SpecializationArgs,
    { prisma }: Context,
  ) => {
    const { id, skip, take } = data;
    try {
      await Yup.object({
        id: Yup.number().required(`ID is required`),
      }).validate(data);

      return await prisma.specialization.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          skills: {
            where: {
              archive: false,
            },
            skip,
            take,
          },
          project_requirements: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  // Filter specializations with search
  filterSpecialization: async (
    _: unknown,
    { data }: SpecializationArgs,
    { prisma }: Context,
  ) => {
    const { archive, name, skip, take } = data;
    try {
      const response = await prisma.specialization.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          AND: {
            name: {
              contains: name ? name.trim() : undefined,
              mode: 'insensitive',
            },
            archive: archive,
          },
        },
        include: {
          skills: {
            where: {
              archive: false,
            },
          },
        },
        skip,
        take,
      });

      const count = await prisma.specialization.findMany({
        where: {
          AND: {
            name: {
              contains: name ? name.trim() : undefined,
              mode: 'insensitive',
            },
            archive: archive,
          },
        },
      });

      return {
        specialization: response,
        count: count.length,
      };
    } catch (error) {
      return error;
    }
  },
  selectSpecializations: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ) => {
    try {
      return await prisma.specialization.findMany({
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
