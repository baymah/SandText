process.env.NODE_ENV = "test";

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["\\\\node_modules\\\\", "/dist/"],
    modulePathIgnorePatterns: ["externalServices"],
    setupFilesAfterEnv: ["./src/shared/utils/testUtils/jest.setup-savedb.ts"],
};
