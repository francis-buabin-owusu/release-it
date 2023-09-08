import { CronJob } from 'cron';
import {
  fetchAndSendDueMail,
  fetchAndSendStartMail,
} from '../helpers/project-notification.js';
import { fetchStartProjectInfo } from '../helpers/start-projects.js';
import { fetchDueProjectInfo } from '../helpers/due-projects.js';
import {
  updateStatusbyEndDate,
  updateStatusbyStartDate,
} from '../helpers/project-status-change.js';

//General scheduler class for all project related jobs
export class ProjectScheduler {
  constructor() {
    this.scheduleProjectMailJob();
    this.scheduleProjectStatusUpdateJob();
  }

  //schedule project mail every 5 minutes
  scheduleProjectMailJob() {
    const schedule = new CronJob('0 0 * * *', async () => {
      const dueProject = await fetchDueProjectInfo();
      const startProject = await fetchStartProjectInfo();

      if (dueProject.length <= 0) {
        schedule.stop();
        schedule.start();
      } else {
        fetchAndSendDueMail();
      }

      if (startProject.length <= 0) {
        schedule.stop();
        schedule.start();
      } else {
        fetchAndSendStartMail();
      }
    });

    schedule.start();
  }

  //schedule project status update every 5 minutes
  scheduleProjectStatusUpdateJob() {
    const schedule = new CronJob('0 0 * * *', async () => {
      const startDate_status = await updateStatusbyStartDate();
      const endDate_status = await updateStatusbyEndDate();

      if (startDate_status.length <= 0) {
        schedule.stop();
        schedule.start();
      }

      if (endDate_status.length <= 0) {
        schedule.stop();
        schedule.start();
      }
    });

    schedule.start();
  }
}
