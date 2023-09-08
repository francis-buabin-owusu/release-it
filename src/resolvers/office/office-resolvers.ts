import { Mutation } from './office-mutations.js';
import { Query } from './office-queries.js';
import { Context } from '../../utils/contexts.js';
import { CreatedBy, UpdatedBy } from '../../utils/helpers-resolver.js';

export const organization_office_resolvers = {
  Query,
  Mutation,
  Office: {
    createdBy: CreatedBy,
    updatedBy: UpdatedBy,
    __resolveReference: async (
      { id }: { id: number | string },
      { prisma }: Context,
    ) => {
      try {
        if (id) {
          return await prisma.office.findUnique({
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
