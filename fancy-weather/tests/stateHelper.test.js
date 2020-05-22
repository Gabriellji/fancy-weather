import fetch from 'node-fetch';
import stateHelper from '../src/state/StateHelper';
import state from '../src/state/state';

global.fetch = fetch;

describe('getWeekDay', () => {
	test('get monday en', () => {
		expect(stateHelper.getWeekDay('2020-05-18', 'en')).toEqual('Monday');
	});

	test('get monday ru', () => {
		expect(stateHelper.getWeekDay('2020-05-18', 'ru')).toEqual('Понедельник');
	});

	test('get monday be', () => {
		expect(stateHelper.getWeekDay('2020-05-18', 'be')).toEqual('Панядзелак');
	});

	test('get friday en', () => {
		expect(stateHelper.getWeekDay('2020-05-22', 'en')).toEqual('Friday');
	});
});

describe('getDateTime', () => {
	test('get 20.05.20', () => {
		expect(stateHelper.getDateTime('2020-05-20 16:30')).toEqual('Wed May 20 2020 16:30');
	});

	test('get 22.05.20', () => {
		expect(stateHelper.getDateTime('2020-05-22 16:30')).toEqual('Fri May 22 2020 16:30');
	});
});


describe('CurrentWeatherFormat', () => {
	const input = {
		location: {
			name: 'Minsk',
			region: 'Minsk',
			country: 'Belarus',
			localtime: '2020-05-22 16:02',
		},
		current: {
			temp_c: 10.0,
			temp_f: 50.0,
			condition: {
				text: 'Partly cloudy',
				icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
				code: 1003,
			},
			wind_kph: 19.1,
			humidity: 58,
			cloud: 75,
			feelslike_c: 7.5,
			feelslike_f: 45.4,
		},
		forecast: {},
		alert: {},
	};


	test('en C', async () => {
		const output = {
			place: 'Minsk, Belarus',
			dataTime: '2020-05-22 16:02',
			temp: 10,
			condition: 'Partly cloudy',
			iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png',
			feelsLike: 7.5,
			wind: 19.1,
			humidity: '58%',
		};

		state.setter('control.lang', 'en');
		state.setter('control.tempScale', 'C');
		const data = await stateHelper.currentWeatherFormat(input);
		expect(data).toEqual(output);
	});

	test('en F', async () => {
		const output = {
			place: 'Minsk, Belarus',
			dataTime: '2020-05-22 16:02',
			temp: 50,
			condition: 'Partly cloudy',
			iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png',
			feelsLike: 45.4,
			wind: 19.1,
			humidity: '58%',
		};

		state.setter('control.lang', 'en');
		state.setter('control.tempScale', 'F');
		const data = await stateHelper.currentWeatherFormat(input);
		expect(data).toEqual(output);
	});
});
