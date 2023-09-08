/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Mutation } from '../../src/resolvers/office/office-mutations';
import { Query } from '../../src/resolvers/office/office-queries';
import { prismaMock } from '../../singleton';

const data: any = {
  id: 1,
  organization_id: 1,
  office_name: 'Test Office',
  city: 'Accra',
  created_by: 2,
  website: 'www.example.com',
  phone_number: '0545524457',
  archive: false,
  update_by: 3,
};

const prisma = prismaMock.skill.create.mockResolvedValue(data);

describe('Mutation', () => {
  it('add office', async () => {
    const result = await Mutation.addOffice(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('update a client', async () => {
    const result = await Mutation.updateOffice(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('archive a client', async () => {
    const result = await Mutation.archiveOffice(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });
});

describe('Query', () => {
  it('list all offices', async () => {
    const result = await Query.listAllOffices(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get office', async () => {
    const result = await Query.getOffice(null, { id: 1 }, prisma);
    await expect(result).toBeTruthy();
  });

  it('filter offices', async () => {
    const result = await Query.filterOffice(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });
});
