import { describe, expect, it } from '@jest/globals';
import {
  confirmStaffEmail,
  EmailData,
} from '../../src/helpers/email-service/html-templates/confirm-staff-html';

describe('confirmStaffEmail', () => {
  const emailData: EmailData = {
    employee: 'John Doe',
    projectName: 'Project X',
    role: 'Developer',
    startDate: '2022-01-01',
    endDate: '2022-02-01',
    user_id: '123456',
    technical_manager_name: 'Jane Smith',
    business_manager_name: 'John Smith',
  };

  it('should return a string', () => {
    const result = confirmStaffEmail(emailData);
    expect(typeof result).toBe('string');
  });

  it('should contain the employee name', () => {
    const result = confirmStaffEmail(emailData);
    expect(result).toContain(emailData.employee);
  });

  it('should contain the project name', () => {
    const result = confirmStaffEmail(emailData);
    expect(result).toContain(emailData.projectName);
  });

  it('should contain the role', () => {
    const result = confirmStaffEmail(emailData);
    expect(result).toContain(emailData.role);
  });

  it('should contain the start date', () => {
    const result = confirmStaffEmail(emailData);
    expect(result).toContain(emailData.startDate);
  });

  it('should contain the end date', () => {
    const result = confirmStaffEmail(emailData);
    expect(result).toContain(emailData.endDate);
  });

  // it('should contain the user ID', () => {
  //   const result = confirmStaffEmail(emailData);
  //   expect(result).toContain(emailData.user_id);
  // });

  it('should contain the technical manager name', () => {
    const result = confirmStaffEmail(emailData);
    expect(result).toContain(emailData.technical_manager_name);
  });

  it('should contain the business manager name', () => {
    const result = confirmStaffEmail(emailData);
    expect(result).toContain(emailData.business_manager_name);
  });

  // it('should contain the correct project details URL', () => {
  //   const result = confirmStaffEmail(emailData);
  //   const expectedUrl = `https://armsent-test.amalitech-dev.net/view-employee/${Encrypt(
  //     `${user_id}`,
  //   ).replace('/', '%2F')}/personal/projects`;
  //   expect(result).toContain(expectedUrl);
  // });

  it('should contain the correct logo URL', () => {
    const result = confirmStaffEmail(emailData);
    const expectedLogoUrl =
      'https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/assets/amalitech-logo.png';
    expect(result).toContain(expectedLogoUrl);
  });
});
