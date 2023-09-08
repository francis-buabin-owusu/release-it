import moment from 'moment';
import { prisma } from '../utils/contexts.js';

const currentDate = new Date();
const formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');

// Update project_status to In_Progress for all projects with start_date = today
export const updateStatusbyStartDate = async () => {
  try {
    const updateProjectStatus = await prisma.project.findMany({
      where: {
        AND: {
          start_date: new Date(formattedCurrentDate),
          project_confirmation_status: true,
          project_status: 'Not_Started',
        },
      },
    });

    const updatedProjects = [];

    for (const project of updateProjectStatus) {
      const updatedProject = await prisma.project.update({
        data: {
          project_status: 'In_Progress',
        },
        where: {
          id: project.id,
        },
      });
      updatedProjects.push(updatedProject);
    }

    return updatedProjects;
  } catch (error) {
    return error;
  }
};

//Update project_status to Completed for all projects with end_date = today
export const updateStatusbyEndDate = async () => {
  try {
    const updateByEndDate = await prisma.project.findMany({
      where: {
        AND: {
          end_date: new Date(formattedCurrentDate),
          project_confirmation_status: true,
          project_status: 'In_Progress',
        },
      },
    });

    const updatedProjects = [];

    for (const project of updateByEndDate) {
      const updatedProject = await prisma.project.update({
        data: {
          project_status: 'Completed',
        },
        where: {
          id: project.id,
        },
      });
      updatedProjects.push(updatedProject);
    }

    return updatedProjects;
  } catch (error) {
    return error;
  }
};
