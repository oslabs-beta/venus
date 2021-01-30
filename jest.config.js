module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(DataFuncDepGraph.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  // "snapshotSerializers": ["enzyme-to-json/serializer"],
  // "setupFilesAfterEnv": ['<rootDir>/src/setupTests.js'],
  // https://jestjs.io/docs/en/configuration.html#transformignorepatterns-arraystring
  // "transformIgnorePatterns": ["/node_modules/(?!vue-awesome)"],
};