import { Context } from '../../utils/contexts.js';
import { CreatedBy, UpdatedBy } from '../../utils/helpers-resolver.js';
import { Query } from './specialization-queries.js';
import { Mutation } from './specialization-mutations.js';

export const specialization_resolvers = {
  Query,
  Mutation,

  Specialization: {
    createdBy: CreatedBy,
    updatedBy: UpdatedBy,
    __resolveReference: async (
      { id }: { id: number | string },
      { prisma }: Context,
    ) => {
      try {
        if (id) {
          return await prisma.specialization.findFirst({
            where: {
              id: Number(id),
              archive: false,
            },
          });
        }
      } catch (error) {
        return error;
      }
    },
  },
};
