module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!next/link)'
  ],
};
