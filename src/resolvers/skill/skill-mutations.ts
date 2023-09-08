import { Context } from '../../utils/contexts.js';
import Yup from 'yup';
import { GraphQLError } from 'graphql';
import { SkillsArgs } from '../../interface/skill-interface';

export const Mutation = {
  // Add/create a skill
  addSkill: async (_: unknown, { data }: SkillsArgs, { prisma }: Context) => {
    const { name, validator_id, specialization_ids, created_by } = data;

    try {
      await Yup.object({
        name: Yup.string().required(`Enter skill Name`).max(50).min(1).trim(),
        validator_id: Yup.number().required(`Validator is required`),
        created_by: Yup.number(),
        specialization_ids: Yup.array().min(1),
      }).validate(data);

      // function to check existence of skill name
      const check = await prisma.skill.findMany({
        where: { name: name.trim() },
      });

      if (check.length === 0) {
        return await prisma.skill.create({
          data: {
            name: name.trim(),
            validator_id,
            created_by: created_by,
            specializations: {
              connect: specialization_ids.map((specialization_id) => ({
                id: specialization_id,
              })),
            },
          },
          include: {
            specializations: true,
          },
        });
      } else {
        throw new GraphQLError(`Skill already exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Update Skill Resolver
  updateSkill: async (
    _: unknown,
    { data }: SkillsArgs,
    { prisma }: Context,
  ) => {
    const { id, name, updated_by, validator_id, specialization_ids } = data;
    try {
      await Yup.object({
        name: Yup.string().max(50).min(1).trim(`Enter skill Name`),
        updated_by: Yup.number(),
        specialization_ids: Yup.array().min(1),
      }).validate(data);

      // function to check for Id existance
      const checkId = await prisma.skill.findUnique({
        where: { id: Number(data.id) },
      });

      const checkNameResult = await prisma.skill.findMany({
        where: {
          name: name.trim(),
        },
      });

      if (checkId) {
        if (checkNameResult.length !== 0) {
          checkNameResult.forEach((result) => {
            if (result.id !== Number(id)) {
              throw new GraphQLError(`Skill name already exist`);
            }
          });
        }

        return await prisma.skill.update({
          where: {
            id: Number(id),
          },
          data: {
            name: name.trim(),
            updated_by,
            updated_at: new Date(),
            validator_id,
            specializations: {
              set: specialization_ids.map((specialization_id) => ({
                id: specialization_id,
              })),
            },
          },
          include: {
            specializations: true,
          },
        });
      } else {
        throw new GraphQLError(`Skill does not exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Archive skill resolver
  archiveSkill: async (
    _: unknown,
    { data }: SkillsArgs,
    { prisma }: Context,
  ) => {
    const { id, updated_by, archive } = data;
    try {
      await Yup.object({
        id: Yup.number().required(`ID is required`),
        updated_by: Yup.number(),
      }).validate(data);

      return await prisma.skill.update({
        where: {
          id: Number(id),
        },
        data: {
          archive,
          updated_by,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
