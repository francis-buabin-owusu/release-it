import { formatDate } from './date-formatter.js';
import { dueProjectEmailTemplate } from './email-service/html-templates/due-project-html.js';
import { startProjectEmailTemplate } from './email-service/html-templates/start-project-html.js';
import { Encrypt } from '../utils/jwt-decoder.js';
import { sendEmail } from '../utils/send-mail/send-mail.js';
import { fetchDueProjectInfo } from './due-projects.js';
import { getUserDetails } from './get-user-id.js';
import { fetchStartProjectInfo } from './start-projects.js';

export const fetchAndSendDueMail = async () => {
  const dueData = await fetchDueProjectInfo();

  for (const info of dueData) {
    const businessManager = await getUserDetails(info.business_manager);
    const technicalManager = await getUserDetails(info.technical_manager);

    const businessManagerEmailData = {
      project_id: Encrypt(`${info.project_id}`).replace('/', '%2F'),
      project_name: info.project_name,
      client_name: info.client_name,
      end_date: formatDate(info.end_date),
      name: businessManager.getUserInfo.user?.first_name,
    };
    const technicalManagerEmailData = {
      project_id: Encrypt(`${info.project_id}`).replace('/', '%2F'),
      project_name: info.project_name,
      client_name: info.client_name,
      end_date: formatDate(info.end_date),
      name: technicalManager.getUserInfo.user?.first_name,
    };

    sendEmail(
      dueProjectEmailTemplate(businessManagerEmailData),
      businessManager.getUserInfo.user?.email,
      'Due Project',
    );

    sendEmail(
      dueProjectEmailTemplate(technicalManagerEmailData),
      technicalManager.getUserInfo.user?.email,
      'Due Project',
    );
  }
};

export const fetchAndSendStartMail = async () => {
  const startData = await fetchStartProjectInfo();

  for (const info of startData) {
    const businessManager = await getUserDetails(info.business_manager);
    const technicalManager = await getUserDetails(info.technical_manager);

    const businessManagerEmailData = {
      project_id: Encrypt(`${info.project_id}`).replace('/', '%2F'),
      project_name: info.project_name,
      client_name: info.client_name,
      start_date: formatDate(info.start_date),
      name: businessManager.getUserInfo.user?.first_name,
    };
    const technicalManagerEmailData = {
      project_id: Encrypt(`${info.project_id}`).replace('/', '%2F'),
      project_name: info.project_name,
      client_name: info.client_name,
      start_date: formatDate(info.start_date),
      name: technicalManager.getUserInfo.user?.first_name,
    };

    sendEmail(
      startProjectEmailTemplate(businessManagerEmailData),
      businessManager.getUserInfo.user?.email,
      'Commence Project',
    );

    sendEmail(
      startProjectEmailTemplate(technicalManagerEmailData),
      technicalManager.getUserInfo.user?.email,
      'Commence Project',
    );
  }
};
