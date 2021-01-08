import fetch from 'node-fetch';
import backgroundApi from '../src/model/BackgroundAPI';


global.fetch = fetch;

describe('BackgroundAPI test', () => {
	test('work', async () => {
		const img = await backgroundApi.loadBgImage();
		expect(img).not.toBeUndefined();
	});

	test('isLink', async () => {
		const img = await backgroundApi.loadBgImage();
		expect(img).toMatch(/https:\/\/images.unsplash.com/);
	});

	test('with search params', async () => {
		const img = await backgroundApi.loadBgImage('day');
		expect(img).toMatch(/https:\/\/images.unsplash.com/);
	});
});
