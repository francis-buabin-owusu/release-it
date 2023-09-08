/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from '@jest/globals';
import { formatDate, addSixMonths } from '../../src/helpers/date-formatter';

describe('formatDate', () => {
  test('should format the date string to "day month year"', () => {
    const dateString = '2023-05-10T00:00:00.000Z';
    const expectedOutput = '10 May 2023';
    const result = formatDate(dateString);
    expect(result).toBe(expectedOutput);
  });
});

describe('addSixMonths', () => {
  test('should add six months to a date string', () => {
    const input = '2023-02-15';
    const expectedOutput = '2023-08-15';
    const result = addSixMonths(input);
    expect(result).toBe(expectedOutput);
  });

  // test('should add six months to a timestamp', () => {
  //   const input = 1673936000000;
  //   const expectedOutput = '2023-07-20';
  //   const result = addSixMonths(input);
  //   expect(result).toBe(expectedOutput);
  // });

  test('should throw an error for invalid input', () => {
    // Input is an invalid type (array)
    const input: any = [];
    expect(() => addSixMonths(input)).toThrow(
      'Invalid input. Expected a date string or a timestamp.',
    );
  });
});
