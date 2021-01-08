import fetch from 'node-fetch';
import stateHelper from '../src/state/StateHelper';
import state from '../src/state/state';

global.fetch = fetch;

describe('getDay', () => {
	test('get number of day', () => {
		expect(stateHelper.getDay('2020-05-18')).toEqual(18);
	});
});

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

describe('getMonths', () => {
	test('get january en', () => {
		expect(stateHelper.getMonths('2020-01-18', 'en')).toEqual('January');
	});

	test('get january ru', () => {
		expect(stateHelper.getMonths('2020-01-18', 'ru')).toEqual('Января');
	});

	test('get january be', () => {
		expect(stateHelper.getMonths('2020-01-18', 'be')).toEqual('Студзеня');
	});

	test('get may en', () => {
		expect(stateHelper.getMonths('2020-05-22', 'en')).toEqual('May');
	});
});

describe('getDateTime', () => {
	test('get 20.05.20', () => {
		expect(stateHelper.getDateTime('2020-05-20 16:30')).toEqual('Wednesday, May 20th');
	});

	test('get 22.05.20', () => {
		expect(stateHelper.getDateTime('2020-05-22 16:30')).toEqual('Friday, May 22nd');
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
			dataTime: 'Friday, May 22nd',
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
			dataTime: 'Fri May 22 2020 16:02',
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

	test('en F', async () => {
		const output = {
			place: 'Минск, Беларусь',
			dataTime: 'Пт 22 Мая 2020 16:02',
			temp: 50,
			condition: 'Небольшая облачность',
			iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png',
			feelsLike: 45.4,
			wind: 19.1,
			humidity: '58%',
		};

		state.setter('control.lang', 'ru');
		state.setter('control.tempScale', 'F');
		const data = await stateHelper.currentWeatherFormat(input);
		expect(data).toEqual(output);
	});

	test('en F', async () => {
		const output = {
			place: 'Мінск, Беларусь',
			dataTime: 'Пт 22 Мая 2020 16:02',
			temp: 50,
			condition: 'Невялікая воблачнасць',
			iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png',
			feelsLike: 45.4,
			wind: 19.1,
			humidity: '58%',
		};

		state.setter('control.lang', 'be');
		state.setter('control.tempScale', 'F');
		const data = await stateHelper.currentWeatherFormat(input);
		expect(data).toEqual(output);
	});
});

describe('threeDaysWeatherFormat', () => {
	const input = {
		location: {},
		current: {},
		forecast: {
			forecastday: [
				{
					date: '2020-05-22',
					day: {
						avgtemp_c: 6.1,
						avgtemp_f: 42.9,
						condition: {
							text: 'Moderate or heavy rain shower',
							icon: '//cdn.weatherapi.com/weather/64x64/day/356.png',
							code: 1243,
						},
						uv: 3.3,
					},
					astro: {},
				},
				{
					date: '2020-05-23',
					day: {
						avgtemp_c: 8.1,
						avgtemp_f: 46.6,
						condition: {
							text: 'Partly cloudy',
							icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
							code: 1003,
						},
					},
					astro: {},
				},
				{
					date: '2020-05-24',
					day: {
						avgtemp_c: 9.7,
						avgtemp_f: 49.5,
						condition: {
							text: 'Overcast',
							icon: '//cdn.weatherapi.com/weather/64x64/day/122.png',
							code: 1009,
						},
					},
					astro: {},
				},
			],
		},
	};

	test('en C', async () => {
		const output = [
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/356.png', temp: 6.1, weekDay: 'Friday' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png', temp: 8.1, weekDay: 'Saturday' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/122.png', temp: 9.7, weekDay: 'Sunday' },
		];

		state.setter('control.lang', 'en');
		state.setter('control.tempScale', 'C');
		const data = await stateHelper.threeDaysWeatherFormat(input);
		expect(data).toEqual(output);
	});

	test('en F', async () => {
		const output = [
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/356.png', temp: 42.9, weekDay: 'Friday' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png', temp: 46.6, weekDay: 'Saturday' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/122.png', temp: 49.5, weekDay: 'Sunday' },
		];
		state.setter('control.lang', 'en');
		state.setter('control.tempScale', 'F');
		const data = await stateHelper.threeDaysWeatherFormat(input);
		expect(data).toEqual(output);
	});

	test('ru F', async () => {
		const output = [
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/356.png', temp: 42.9, weekDay: 'Пятница' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png', temp: 46.6, weekDay: 'Суббота' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/122.png', temp: 49.5, weekDay: 'Воскресенье' },
		];
		state.setter('control.lang', 'ru');
		state.setter('control.tempScale', 'F');
		const data = await stateHelper.threeDaysWeatherFormat(input);
		expect(data).toEqual(output);
	});

	test('be F', async () => {
		const output = [
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/356.png', temp: 42.9, weekDay: 'Пятніца' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png', temp: 46.6, weekDay: 'Субота' },
			{ iconUrl: '//cdn.weatherapi.com/weather/64x64/day/122.png', temp: 49.5, weekDay: 'Нядзеля' },
		];
		state.setter('control.lang', 'be');
		state.setter('control.tempScale', 'F');
		const data = await stateHelper.threeDaysWeatherFormat(input);
		expect(data).toEqual(output);
	});
});

describe('fiveDaysWeatherFormat', () => {
	const input = {
		location: {},
		current: {},
		forecast: {
			forecastday: [
				{
					date: '2020-05-25',
					day: {
						avgtemp_c: 11.4,
						avgtemp_f: 52.5,
						avghumidity: 75.0,
						daily_chance_of_rain: '98',
						condition: {
							text: 'Light rain',
						},
						uv: 3.3,
					},
					astro: {
						sunrise: '04:52 AM',
						sunset: '09:22 PM',
						moon_phase: 'Waxing Crescent',
					},
				},
				{
					date: '2020-05-26',
					day: {
						avgtemp_c: 12.8,
						avgtemp_f: 55.1,
						avghumidity: 75.0,
						daily_chance_of_rain: '84',
						condition: {
							text: 'Patchy rain possible',
						},
						uv: 5.4,
					},
					astro: {
						sunrise: '04:51 AM',
						sunset: '09:24 PM',
						moon_phase: 'Waxing Crescent',
					},
				},
				{
					date: '2020-05-27',
					day: {
						avgtemp_c: 9.7,
						avgtemp_f: 49.5,
						avghumidity: 75.0,
						daily_chance_of_rain: '84',
						condition: {
							text: 'Overcast',
						},
						uv: 5.4,
					},
					astro: {
						sunrise: '04:51 AM',
						sunset: '09:24 PM',
						moon_phase: 'Waxing Crescent',
					},
				},
				{
					date: '2020-05-28',
					day: {
						avgtemp_c: 9.7,
						avgtemp_f: 49.5,
						avghumidity: 75.0,
						daily_chance_of_rain: '84',
						condition: {
							text: 'Overcast',
						},
						uv: 5.4,
					},
					astro: {
						sunrise: '04:51 AM',
						sunset: '09:24 PM',
						moon_phase: 'Waxing Crescent',
					},
				},
				{
					date: '2020-05-29',
					day: {
						avgtemp_c: 9.7,
						avgtemp_f: 49.5,
						avghumidity: 75.0,
						daily_chance_of_rain: '84',
						condition: {
							text: 'Overcast',
						},
						uv: 5.4,
					},
					astro: {
						sunrise: '04:51 AM',
						sunset: '09:24 PM',
						moon_phase: 'Waxing Crescent',
					},
				},
			],
		},
	};

	test('en C', async () => {
		const output = [
			{
				condition: 'Light rain',
				dailyChanceOfRain: '98',
				date: 25,
				humidity: '75%',
				month: 'May',
				moonPhase: 'Waxing Crescent',
				sunrise: '04:52 AM',
				sunset: '09:22 PM',
				temp: 11.4,
				uv: 3.3,
				weekDay: 'Monday',
			},
			{
				condition: 'Light rain',
				dailyChanceOfRain: '84',
				date: 26,
				humidity: '75%',
				month: 'May',
				moonPhase: 'Waxing Crescent',
				sunrise: '04:51 AM',
				sunset: '09:24 PM',
				temp: 12.8,
				uv: 5.4,
				weekDay: 'Tuesday',
			},
			{
				condition: 'Light rain',
				dailyChanceOfRain: '84',
				date: 27,
				humidity: '75%',
				month: 'May',
				moonPhase: 'Waxing Crescent',
				sunrise: '04:51 AM',
				sunset: '09:24 PM',
				temp: 9.7,
				uv: 5.4,
				weekDay: 'Wednesday',
			},
			{
				condition: 'Light rain',
				dailyChanceOfRain: '84',
				date: 28,
				humidity: '75%',
				month: 'May',
				moonPhase: 'Waxing Crescent',
				sunrise: '04:51 AM',
				sunset: '09:24 PM',
				temp: 9.7,
				uv: 5.4,
				weekDay: 'Thursday',
			},
			{
				condition: 'Light rain',
				dailyChanceOfRain: '84',
				date: 29,
				humidity: '75%',
				month: 'May',
				moonPhase: 'Waxing Crescent',
				sunrise: '04:51 AM',
				sunset: '09:24 PM',
				temp: 9.7,
				uv: 5.4,
				weekDay: 'Friday',
			},
		];
		state.setter('control.lang', 'en');
		state.setter('control.tempScale', 'C');
		const data = await stateHelper.fiveDaysWeatherFormat(input);
		expect(data).toEqual(output);
	});
});
