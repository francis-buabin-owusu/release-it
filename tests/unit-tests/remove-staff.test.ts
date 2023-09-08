import {
  removeStaffEmail,
  EmailData,
} from '../../src/helpers/email-service/html-templates/remove-staff-html';
import { describe, expect, it } from '@jest/globals';

describe('removeStaffEmail', () => {
  const emailData: EmailData = {
    employee: 'John Doe',
    projectName: 'Project X',
  };

  it('should return a string', () => {
    const result = removeStaffEmail(emailData);
    expect(typeof result).toBe('string');
  });

  it('should contain the employee name in the email body', () => {
    const result = removeStaffEmail(emailData);
    expect(result).toContain(emailData.employee);
  });

  it('should contain the project name in the email body', () => {
    const result = removeStaffEmail(emailData);
    expect(result).toContain(emailData.projectName);
  });
});
