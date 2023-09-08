import { Context } from '../../utils/contexts.js';
import { SkillsArgs } from '../../interface/skill-interface.js';

export const Query = {
  // Get all Skills
  skills: async (_: unknown, { data }: SkillsArgs, { prisma }: Context) => {
    try {
      const { skip, take } = data;
      return await prisma.skill.findMany({
        skip,
        take,
        orderBy: {
          id: 'desc',
        },
        where: {
          archive: false,
        },
        include: {
          specializations: {
            where: {
              archive: false,
            },
          },
          required_skills: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  // Get all Skills
  skill: async (
    _: unknown,
    { id }: { id: number | string },
    { prisma }: Context,
  ) => {
    try {
      return await prisma.skill.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          specializations: {
            where: {
              archive: false,
            },
          },
          required_skills: true,
        },
      });
    } catch (error) {
      return error;
    }
  },

  // Filter skills with search
  filterSkill: async (
    _: unknown,
    { data }: SkillsArgs,
    { prisma }: Context,
  ) => {
    const { name, archive, skip, take } = data;
    try {
      const response = await prisma.skill.findMany({
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
            archive: archive,
          },
        },
        include: {
          specializations: {
            where: {
              archive: false,
            },
          },
        },
      });

      const count = await prisma.skill.findMany({
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
        skill: response,
        count: count.length,
      };
    } catch (error) {
      return error;
    }
  },
  selectSkills: async (_: unknown, __: unknown, { prisma }: Context) => {
    try {
      return await prisma.skill.findMany({
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
