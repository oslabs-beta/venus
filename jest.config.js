module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "roots": [
    "<rootDir>/src"
  ],
  // configured here to allow tsx, ts, js and jsx to ts-jest
  "transform": {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  // "setupFilesAfterEnv": ['<rootDir>/src/setupTests.js'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    // "@testing-library/react/cleanup-after-each",
    // "@testing-library/jest-dom/extend-expect"
  ],
  // https://jestjs.io/docs/en/configuration.html#transformignorepatterns-arraystring
  // "transformIgnorePatterns": ["/node_modules"],
  // Module file extensions for importing
  // moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};