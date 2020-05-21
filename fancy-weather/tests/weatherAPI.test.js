import fetch from 'node-fetch';
import WeatherAPI from '../src/model/WeatherAPI';

global.fetch = fetch;

describe('WeatherAPI test', () => {
	test('work', async () => {
		const data = await WeatherAPI.loadWeather('Minsk');
		expect(data).not.toBeUndefined();
	});

	test('is right data', async () => {
		const data = await WeatherAPI.loadWeather('Minsk');
		expect(data.location.name).toBe('Minsk');
	});

	test('is object', async () => {
		const data = await WeatherAPI.loadWeather('Minsk');
		expect(typeof data).toBe('object');
	});
});
