import WeatherAPI from '../src/model/WeatherAPI';

describe('WeatherAPI test', () => {
	test('work', () => {
		expect(WeatherAPI.loadWeather('Minsk')).not.toBeUndefined();
	});
});
