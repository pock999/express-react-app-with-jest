module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy"
  }
}