/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import {
  toSentenceCase,
  toCapitalizeEachWord,
} from '../../src/helpers/text-formatter';

describe('toSentenceCase', () => {
  it('should capitalize the first letter and convert the rest to lowercase', () => {
    const input = 'hello, world';
    const expectedOutput = 'Hello, world';
    const result = toSentenceCase(input);
    expect(result).toBe(expectedOutput);
  });

  it('should return an empty string if the input is empty', () => {
    const input = '';
    const expectedOutput = '';
    const result = toSentenceCase(input);
    expect(result).toBe(expectedOutput);
  });

  it('should capitalize a single character', () => {
    const input = 'a';
    const expectedOutput = 'A';
    const result = toSentenceCase(input);
    expect(result).toBe(expectedOutput);
  });

  it('should return null if the input is null', () => {
    const input: any = null;
    const expectedOutput = null;
    const result = toSentenceCase(input);
    expect(result).toBe(expectedOutput);
  });
});

describe('toCapitalizeEachWord', () => {
  it('should capitalize the first letter of each word', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello World';
    const result = toCapitalizeEachWord(input);
    expect(result).toBe(expectedOutput);
  });

  it('should handle a single-word input', () => {
    const input = 'hello';
    const expectedOutput = 'Hello';
    const result = toCapitalizeEachWord(input);
    expect(result).toBe(expectedOutput);
  });

  it('should handle an empty string input', () => {
    const input = '';
    const expectedOutput = '';
    const result = toCapitalizeEachWord(input);
    expect(result).toBe(expectedOutput);
  });

  it('should handle null input', () => {
    const input: any = null;
    const expectedOutput = null;
    const result = toCapitalizeEachWord(input);
    expect(result).toBe(expectedOutput);
  });
});
