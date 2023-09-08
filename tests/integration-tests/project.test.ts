/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { describe, expect, it } from '@jest/globals';
import { prismaMock } from '../../singleton';
import { Mutation } from '../../src/resolvers/project/project-mutations';
import { Query } from '../../src/resolvers/project/project-queries';

const data: any = {
  name: 'Nexum',
  description: 'This is a test',
  client_id: 1,
  business_manager_id: 1,
  technical_manager_id: 1,
  project_confirmation_status: false,
  project_status: 'In_Progress',
  created_by: 1,
  start_date: '2022-11-12',
  end_date: '',
  requirements: [
    {
      specialization_id: 1,
      position_id: 1,
      skill_ids: [1, 3],
      employees_required: 3,
    },
    {
      specialization_id: 1,
      position_id: 1,
      skill_ids: [5, 3],
      employees_required: 2,
    },
  ],
  staffs: [{ user_id: 27 }, { user_id: 8 }, { user_id: 3 }, { user_id: 4 }],
};
const prisma = prismaMock.project.create.mockResolvedValue(data);

// describe('addProject', () => {
//   it('creates a project', async () => {
//     const result = await Mutation.addProject(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('updateProject', () => {
//   it('update a project', async () => {
//     const result = await Mutation.updateProject(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('archiveProject', () => {
//   it('update a project', async () => {
//     const result = await Mutation.archiveProject(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('confirmStaff', () => {
//   it('Confirm a staff', async () => {
//     const result = await Mutation.confirmStaff(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('bulkStaffConfirm', () => {
//   it('Confirm a staff', async () => {
//     const result = await Mutation.bulkStaffConfirm(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('removeStaff', () => {
//   it('remove a staff', async () => {
//     const result = await Mutation.removeStaff(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('addMoreStaffToProject', () => {
//   it('add more staff to project', async () => {
//     const result = await Mutation.addMoreStaffToProject(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('removeDeactivatedStaff', () => {
//   it('remove a deactivated staff from project', async () => {
//     const result = await Mutation.removeDeactivatedStaff(
//       null,
//       { user_id: 8 },
//       prisma,
//     );
//     await expect(result).toBeTruthy;
//   });
// });

// describe('updateProjectStatus', () => {
//   it('update project status', async () => {
//     const result = await Mutation.updateProjectStatus(null, { data }, prisma);
//     await expect(result).toBeTruthy;
//   });
// });

// describe('updateProjectConfirmationStatus', () => {
//   it('update project confirmation status', async () => {
//     const result = await Mutation.updateProjectConfirmationStatus(
//       null,
//       { data },
//       prisma,
//     );
//     await expect(result).toBeTruthy;
//   });
// });

// describe('updateProjectStaffingStatus', () => {
//   it('update project staffing status', async () => {
//     const result = await Mutation.updateProjectStaffingStatus(
//       null,
//       { data },
//       prisma,
//     );
//     await expect(result).toBeTruthy;
//   });
// });

describe('Query', () => {
  it('list all clients', async () => {
    const result = await Query.projects(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('update a client', async () => {
    const result = await Query.project(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get parent organizations', async () => {
    const result = await Query.filterProjectDetails(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('filter clients', async () => {
    const result = await Query.filterProjectDetailsWithStaff(
      null,
      { data },
      prisma,
    );
    await expect(result).toBeTruthy();
  });

  it('get multiple clients', async () => {
    const result = await Query.filterProjectStatus(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get multiple clients', async () => {
    const result = await Query.globalStaffing(null, { data }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get multiple clients', async () => {
    const result = await Query.searchProject(null, { name: 'hello' }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get multiple clients', async () => {
    const result = await Query.userCurrentProject(null, { userId: 5 }, prisma);
    await expect(result).toBeTruthy();
  });

  it('get multiple clients', async () => {
    const result = await Query.user_on_project(null, { id: 1 }, prisma);
    await expect(result).toBeTruthy();
  });
});
