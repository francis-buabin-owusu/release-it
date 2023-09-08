import { Query } from './client-queries.js';
import { Mutation } from './client-mutations.js';
import { Context } from '../../utils/contexts.js';
import { CreatedBy, UpdatedBy } from '../../utils/helpers-resolver.js';

export const client_resolvers = {
  Query,
  Mutation,
  Client: {
    createdBy: CreatedBy,
    updatedBy: UpdatedBy,
    __resolveReference: async (
      { id }: { id: number | string },
      { prisma }: Context,
    ) => {
      try {
        if (id) {
          return await prisma.client.findUnique({
            where: {
              id: Number(id),
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
        }
      } catch (error) {
        return error;
      }
    },
  },
};
