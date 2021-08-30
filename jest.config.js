module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['<rootDir>/src/**/*.(spec|test).(ts|js)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    '^@storeModule/(.*)$': '<rootDir>/src/store/modules/$1',
    '^@type': '<rootDir>typescript/types.ts',
    '^@interface': '<rootDir>typescript/interfaces.ts'
  },
  transform: {
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: true
}
