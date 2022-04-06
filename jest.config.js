module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.js',
  ],
  transformIgnorePatterns: [
    '^.+.(css|scss)$',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '~(.*)$': '<rootDir>/src/$1',
  },
}
