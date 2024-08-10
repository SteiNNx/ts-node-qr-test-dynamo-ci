import type { Config } from 'jest';

const config: Config = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  coverageDirectory: "coverage",
  collectCoverage: true,
  coverageReporters: ["json", "html"]
};

export default config;
