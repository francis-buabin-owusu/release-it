/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';
import prisma from './client';
import { beforeEach, jest } from '@jest/globals';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));
beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as any; //as unknown as DeepMockProxy<PrismaClient>
