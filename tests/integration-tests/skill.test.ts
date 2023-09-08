/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Mutation } from '../../src/resolvers/skill/skill-mutations';
import { Query } from '../../src/resolvers/skill/skill-queries';
import { prismaMock } from '../../singleton';

const data: any = {
  id: 1,
  name: 'Test skill',
  validator_id: 1,
  specialization_ids: [1],
  created_by: 1,
  updated_by: null,
  archived: true,
};

const prisma = prismaMock.skill.create.mockResolvedValue(data);

describe('Mutation', () => {
  it('add a skill', async () => {
    const result = await Mutation.addSkill(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('update a skill', async () => {
    const result = await Mutation.updateSkill(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('archive a skill', async () => {
    const result = await Mutation.archiveSkill(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });
});

describe('Query', () => {
  it('list all skills', async () => {
    const result = await Query.skills(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('update a skill', async () => {
    const result = await Query.skill(null, { id: 1 }, prisma);
    await expect(result).toBeTruthy();
  });

  it('archive a skill', async () => {
    const result = await Query.filterSkill(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });
});
