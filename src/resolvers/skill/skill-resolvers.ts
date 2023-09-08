import { Context } from '../../utils/contexts.js';
import {
  CreatedBy,
  UpdatedBy,
  Validator,
} from '../../utils/helpers-resolver.js';
import { Query } from './skill-queries.js';
import { Mutation } from './skill-mutations.js';

export const skill_resolvers = {
  Query,
  Mutation,
  Skill: {
    validator: Validator,
    createdBy: CreatedBy,
    updatedBy: UpdatedBy,
    __resolveReference: async (
      { id }: { id: number | string },
      { prisma }: Context,
    ) => {
      try {
        if (id) {
          return await prisma.skill.findUnique({
            where: {
              id: Number(id),
            },
          });
        }
      } catch (error) {
        return error;
      }
    },
  },
};
