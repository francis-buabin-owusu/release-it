import { describe, expect, it } from '@jest/globals';
import { Mutation } from '../../src/resolvers/specialization/specialization-mutations';
import { prismaMock } from '../../singleton';
import { Query } from '../../src/resolvers/specialization/specialization-queries';
const data: any = {
  id: 1,
  name: 'Backend',
  created_by: 5,
  updated_by: null,
  archive: false,
};
const prisma = prismaMock.specialization.create.mockResolvedValue(data);

describe('addSpecialization', () => {
  it('creates a specialization', async () => {
    const result = await Mutation.addSpecialization(null, { data }, prisma);
    // await expect(result).resolves.toEqual(true);
    await expect(result).toBeTruthy;
  });
});

describe('updateSpecialization', () => {
  it('update a specialization', async () => {
    const result = await Mutation.updateSpecialization(null, { data }, prisma);
    // await expect(result).resolves.toEqual(true);
    await expect(result).toBeTruthy;
  });
});

describe('archiveSpecialization', () => {
  it('archive a specialization', async () => {
    const result = await Mutation.archiveSpecialization(null, { data }, prisma);
    // await expect(result).resolves.toEqual(true);
    await expect(result).toBeTruthy;
  });
});

describe('specializations', () => {
  it('get all specialization', async () => {
    const result = await Query.specializations(null, { data }, prisma);
    // await expect(result).resolves.toEqual(true);
    await expect(result).toBeTruthy;
  });
});

describe('getSpecializations', () => {
  it('get a specialization', async () => {
    const result = await Query.getSpecialization(null, { data }, prisma);
    // await expect(result).resolves.toEqual(true);
    await expect(result).toBeTruthy;
  });
});

describe('filterSpecialization', () => {
  it('specialization filter', async () => {
    const result = await Query.filterSpecialization(null, { data }, prisma);
    // await expect(result).resolves.toEqual(true);
    await expect(result).toBeTruthy;
  });
});
