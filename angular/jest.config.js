module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  moduleNameMapper: {
    "@agfe/core": "<rootDir>/src/app/core",
    "@agfe/shared": "<rootDir>/src/app/shared",
    "@agfe/features": "<rootDir>/src/app/features",
  },
};
