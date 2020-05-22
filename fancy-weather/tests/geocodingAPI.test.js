import fetch from 'node-fetch';
import GeocodingAPI from '../src/model/GeocodingAPI';

global.fetch = fetch;

describe('GeocodingAPI test', () => {
	test('work', async () => {
		const data = await GeocodingAPI.loadGeoCode('Minsk');
		expect(data).not.toBeUndefined();
	});

	test('is right data', async () => {
		const data = await GeocodingAPI.loadGeoCode('Minsk');
		expect(data.results[0].annotations.DMS.lat).toBe("53° 54' 8.40240'' N");
	});

	test('is object', async () => {
		const data = await GeocodingAPI.loadGeoCode('Minsk');
		expect(typeof data).toBe('object');
	});

	test('error', async () => {
		let msg = '';
		try {
			await GeocodingAPI.loadGeoCode('Minsk', 'fail');
		} catch (err) {
			msg = err.message;
		}
		expect(msg).toBe('401');
	});
});
