process.env.NODE_ENV = "production";

module.exports = {
    // preset: "ts-jest",
    // testEnvironment: "node",
    // testPathIgnorePatterns: ["\\\\node_mules\\\\", "/dist/"],
    // modulePathIgnorePatterns: ["externalServices"],
    // setupFilesAfterEnv: ["./src/shared/utils/testUtils/jest.setup.ts"],

    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
