import { Context } from '../../utils/contexts.js';

export const smokeTestQueryResolver = {
  Query: {
    resourceHealthCheck: (): string => {
      return 'OK';
    },
    resourceDBCheck: async (_: unknown, __: unknown, { prisma }: Context) => {
      try {
        await prisma.specialization.findUnique({
          where: {
            id: 1852925754267869,
          },
        });
        return 'Error';
      } catch (error) {
        return 'OK';
      } finally {
        await prisma.$disconnect();
      }
    },
  },
};
