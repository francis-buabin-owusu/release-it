export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./tests'], // The directory where your test files are located
  testMatch: ['**/*.test.ts'], // Pattern to identify test files (e.g., file.test.ts)
  setupFilesAfterEnv: ['./singleton.ts'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['/node_modules/cliui(.*)'],
};
