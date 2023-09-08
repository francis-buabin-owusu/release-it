import { PrismaClient, Prisma } from '@prisma/client';
import { Request } from 'express';
import { MyDatabase } from '../datasources/auth-data-source.js';
export const prisma = new PrismaClient();

//Prisma Context for the headers
export interface Context {
  req: Request;
  dataSources: {
    AuthDataSource: MyDatabase;
  };
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
}
