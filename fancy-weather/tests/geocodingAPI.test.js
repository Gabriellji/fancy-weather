import fetch from 'node-fetch';
import GeocodingAPI from '../src/model/GeocodingAPI';

global.fetch = fetch;

describe('GeocodingAPIForward test', () => {
	test('work', async () => {
		const data = await GeocodingAPI.loadGeoCodeForward('Minsk');
		expect(data).not.toBeUndefined();
	});

	test('is right data', async () => {
		const data = await GeocodingAPI.loadGeoCodeForward('Minsk');
		expect(data.results[0].annotations.DMS.lat).toBe("53° 54' 8.40240'' N");
	});

	test('is object', async () => {
		const data = await GeocodingAPI.loadGeoCodeForward('Minsk');
		expect(typeof data).toBe('object');
	});

	test('error', async () => {
		let msg = '';
		try {
			await GeocodingAPI.loadGeoCodeForward('Minsk', 'fail');
		} catch (err) {
			msg = err.message;
		}
		expect(msg).toBe('401');
	});
});


describe('GeocodingAPIReverse test', () => {
	test('work', async () => {
		const data = await GeocodingAPI.loadGeoCodeReverse('53.9', '27.57');
		expect(data).not.toBeUndefined();
	});

	test('is right data', async () => {
		const data = await GeocodingAPI.loadGeoCodeReverse('53.9', '27.57');
		expect(data.results[0].components.city).toBe('Minsk');
	});

	test('is object', async () => {
		const data = await GeocodingAPI.loadGeoCodeReverse('53.9', '27.57');
		expect(typeof data).toBe('object');
	});

	test('error', async () => {
		let msg = '';
		try {
			await GeocodingAPI.loadGeoCodeReverse('53.9', '27.57', 'fail');
		} catch (err) {
			msg = err.message;
		}
		expect(msg).toBe('401');
	});
});
