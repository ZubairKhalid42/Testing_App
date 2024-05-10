module.exports = {
  testEnvironment: 'jsdom', // Simulate the browser environment using jsdom

  // Look for test files with these patterns
  testMatch: ['<rootDir>/client/src/**/*.test.js'],

  // Setup files to run before each test
  setupFilesAfterEnv: ['@testing-library/react/dont-cleanup-after-each'],

  // Map CSS/SCSS imports to identity-obj-proxy to mock them
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  preset: 'babel-jest',
  // Add Babel transformation for JSX files
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  
  
  // coverage thresholds
  // Ensures at least 80% coverage for statements, branches, functions, and lines
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
