import { Mutation } from './project-mutations.js';
import { Query } from './project-queries.js';
import { Context } from '../../utils/contexts.js';
import {
  Business_manager,
  CreatedBy,
  Technical_manager,
  UpdatedBy,
  User,
  EmployeeInfo,
} from '../../utils/helpers-resolver.js';

export const project_resolvers = {
  Query,
  Mutation,
  Project: {
    user: User,
    business_manager: Business_manager,
    technical_manager: Technical_manager,
    createdBy: CreatedBy,
    updatedBy: UpdatedBy,
    employee: EmployeeInfo,
    __resolveReference: async (
      { id }: { id: number | string },
      { prisma }: Context,
    ) => {
      try {
        if (id) {
          return await prisma.project.findUnique({
            where: { id: Number(id) },
            include: {
              project_staffs: true,
              client: true,
            },
          });
        }
      } catch (error) {
        return error;
      }
    },
  },

  Staff: {
    employee: EmployeeInfo,
  },
};
