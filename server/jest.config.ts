import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
	collectCoverageFrom: [
		"./src/**"
	],
	collectCoverage: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
};

export default config