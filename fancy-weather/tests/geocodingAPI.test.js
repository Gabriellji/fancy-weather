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
		expect(data).toEqual({ lat: 53.9717897, long: 28.0608997 });
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
		expect(data).toBe('Belarus, 220030 Minsk, улица Янки Купалы, 5, Дом Ахмеда Офли');
	});

	test('is object', async () => {
		const data = await GeocodingAPI.loadGeoCodeReverse('53.9', '27.57');
		expect(typeof data).toBe('string');
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
