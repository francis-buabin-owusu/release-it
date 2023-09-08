/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Mutation } from '../../src/resolvers/client/client-mutations';
import { Query } from '../../src/resolvers/client/client-queries';
import { prismaMock } from '../../singleton';

const data: any = {
  id: 1,
  update_by: 1,
  archive: true,
  client_name: 'Test Client',
  description: 'Testing the client',
  parent_id: 1,
  currency: 'USD',
  time_zone: 'UTC',
  website: 'testclient@gmail.com',
  logo: 'testclient.png',
  isOrganization: true,
  created_by: 2,
  country: 'United States',
  state_region: 'United States',
  city: 'Texas',
  street_address: 'Travis street address',
  zip_code: '00233',
  bank_name: 'Cal Bank',
  account_name: 'Test Client',
  account_number: '12345678910',
  branch: 'Advent',
  swift_key: '140141',
  contact_person: [
    {
      name: 'Contact Test',
      email: 'contact@testclient.com',
      phone: '1234567890',
    },
  ],
  client_ids: [1, 2],
  skip: 0,
  take: 5,
};

const prisma = prismaMock.skill.create.mockResolvedValue(data);

describe('Mutation', () => {
  it('add a client', async () => {
    const result = await Mutation.addClient(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('update a client', async () => {
    const result = await Mutation.updateClient(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('archive a client', async () => {
    const result = await Mutation.archiveClient(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });
});

describe('Query', () => {
  it('list all clients', async () => {
    const result = await Query.clients(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('update a client', async () => {
    const result = await Query.client(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get parent organizations', async () => {
    const result = await Query.getParentOrganizations(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('filter clients', async () => {
    const result = await Query.filterClient(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get multiple clients', async () => {
    const result = await Query.getMutipleClients(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });
});
