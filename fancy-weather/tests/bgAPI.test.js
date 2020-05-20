import backgroundApi from '../src/model/BackgroundAPI';

describe('BackgroundAPI test', () => {
	test('setter/getter', () => {
		expect(backgroundApi.loadBgImage()).not.toBeUndefined();
	});
});
