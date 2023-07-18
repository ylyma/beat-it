/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    // preset: 'ts-jest',
    // // preset: 'ts-jest/presets/default-esm',
    // testEnvironment: 'node',
    // "transform": {
    //     "\\.[jt]sx?$": "ts-jest",
    //   "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }]
    // },
    "transformIgnorePatterns": [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native|firebase)"
      ],
    preset: 'react-native',
    transform: {
      '^.+\\.jsx$': 'babel-jest',
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.test.json',
        },
      ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        /* This is key to preventing the webpack error. */
        '^firebase(.*)$': '<rootDir>/__mocks__/firebaseMock.js',
        '^firebase/analytics(.*)$': '<rootDir>/__mocks__/firebaseAnalyticsMock.js',
        '^react-native-track-player(.*)$': '<rootDir>/__mocks__/react-native-track-player-Mock.js',
        '^@react-native-google-signin(.*)$': '<rootDir>/__mocks__/react-native-google-signin-Mock.js',
        '^shorthash(.*)$': '<rootDir>/__mocks__/shorthashMock.js',
      },
  };