import { Context } from '../../utils/contexts.js';
import Yup from 'yup';
import { GraphQLError } from 'graphql';
import { SpecializationArgs } from '../../interface/specialization-interface.js';

export const Mutation = {
  // Add Specialization
  addSpecialization: async (
    _: unknown,
    { data }: SpecializationArgs,
    { prisma }: Context,
  ) => {
    const { name, created_by } = data;
    try {
      // Validate Specialization info
      await Yup.object({
        name: Yup.string()
          .required('Provide a valid Specialization name')
          .max(50)
          .min(2)
          .trim(),
        created_by: Yup.number(),
      }).validate(data);

      const check = await prisma.specialization.findMany({
        where: { name: name.trim() },
      });

      if (name !== null) {
        if (check.length === 0) {
          return await prisma.specialization.create({
            data: {
              name: name.trim(),
              created_by: created_by,
            },
          });
        } else {
          throw new GraphQLError(`Specialization already exists`);
        }
      } else {
        throw new GraphQLError(`Specialization name cannot be empty`);
      }
    } catch (error) {
      return error;
    }
  },

  // Update Specialization
  updateSpecialization: async (
    _: unknown,
    { data }: SpecializationArgs,
    { prisma }: Context,
  ) => {
    const { id, name, updated_by } = data;
    try {
      await Yup.object({
        id: Yup.number().required(`ID is required`),
        name: Yup.string().required().max(50).min(1).trim(),
        updated_by: Yup.number(),
      }).validate(data);

      // function to check for name existance
      const check = await prisma.specialization.findMany({
        where: { name: name.trim() },
      });

      // function to check for Id existance
      const checkId = await prisma.specialization.findUnique({
        where: { id: Number(data.id) },
      });

      if (checkId) {
        if (check.length === 0) {
          return await prisma.specialization.update({
            where: {
              id: Number(id),
            },
            data: {
              name: name.trim(),
              updated_at: new Date(),
              updated_by: updated_by,
            },
            include: {
              skills: true,
            },
          });
        } else {
          throw new GraphQLError(`Specialization already exist`);
        }
      } else {
        throw new GraphQLError(`Specialization does not exist`);
      }
    } catch (error) {
      return error;
    }
  },

  // Archive Specialization
  archiveSpecialization: async (
    _: unknown,
    { data }: SpecializationArgs,
    { prisma }: Context,
  ) => {
    const { id, updated_by, archive } = data;
    try {
      await Yup.object({
        id: Yup.number().required(`ID is required`),
      }).validate(data);

      return await prisma.specialization.update({
        where: {
          id: Number(id) || undefined,
        },
        data: {
          archive,
          archived_at: new Date(),
          updated_by: updated_by,
        },
      });
    } catch (error) {
      return new GraphQLError(`Specialization does not exist`);
    }
  },
};
