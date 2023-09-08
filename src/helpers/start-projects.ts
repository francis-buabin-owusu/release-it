import { prisma } from '../utils/contexts.js';

export const fetchStartProjectInfo = async () => {
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

  const dueProjects = await prisma.project.findMany({
    where: {
      start_date: {
        gte: new Date(),
        lte: twoWeeksFromNow,
      },
    },
    include: {
      client: true,
    },
  });

  const projectInfo = [];

  for (const info of dueProjects) {
    projectInfo.push({
      project_id: info.id,
      project_name: info.name,
      client_name: info.client.client_name,
      start_date: info.start_date,
      business_manager: info.business_manager_id,
      technical_manager: info.technical_manager_id,
    });
  }
  return projectInfo;
};
