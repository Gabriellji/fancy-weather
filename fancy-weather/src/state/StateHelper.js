import TranslationAPI from '../model/TranslationAPI';
import state from './state';
import icons from '../weather-icons/weather-icons';

const stateHelper = {
	state,
	icons,
	getDay(date) {
		const numberOfDay = new Date(date).getDate();
		return numberOfDay;
	},

	getWeekDay(day, local) {
		const weekdays = require(`../config/i18n/${local}/weekdays.js`);
		const weekdayNumber = new Date(day).getDay();
		return weekdays.default[weekdayNumber];
	},

	getMonths(date, local) {
		const months = require(`../config/i18n/${local}/months.js`);
		const monthsNumber = new Date(date).getMonth();
		return months.default[monthsNumber];
	},

	getDateTime(dateString) {
		const currentLang = this.state.getter('control.lang');
		if (currentLang !== 'en') {
			const dateArr = dateString.toDateString();
			const splite = dateArr.split(' ');
			const date = splite.splice(0, 3).reverse().join(' ');
			return `${date}`;
		}
		const dateArr = dateString.toDateString();
		const splite = dateArr.split(' ');
		const date = splite.splice(0, 3).join(' ');
		return `${date}`;
	},

	async currentWeatherFormat(data) {
		let place = `${data.location.name}, ${data.location.country}`;
		let dataTime = this.getDateTime(new Date(data.location.localtime));
		let condition = data.current.condition.text;

		const currentLang = this.state.getter('control.lang');
		if (currentLang !== 'en') {
			place = await TranslationAPI.loadTranslate(place, currentLang);
			dataTime = await TranslationAPI.loadTranslate(dataTime, currentLang);
			condition = await TranslationAPI.loadTranslate(condition, currentLang);
		}
		return {
			place,
			dataTime,
			tz_id: data.location.tz_id,
			temp: this.state.getter('control.tempScale') === 'C'
				? Math.round(data.current.temp_c)
				: Math.round(data.current.temp_f),
			condition,
			iconUrl: data.current.is_day
				? icons[data.current.condition.code].day
				: icons[data.current.condition.code].night,
			feelsLike: this.state.getter('control.tempScale') === 'C'
				? `${Math.round(data.current.feelslike_c)}°`
				: `${Math.round(data.current.feelslike_f)}°`,
			wind: this.state.getter('control.lang') === 'en'
				? `${Math.round(data.current.wind_mph)} m/h`
				: `${Math.round(data.current.wind_mph)} м/с`,
			humidity: `${data.current.humidity}%`,
			speechText: await this.getWeatherSpeechText(data),
		};
	},

	async getWeatherSpeechText(data) {
        let text = `For ${this.getDateTime(new Date(data.location.localtime))},
            ${data.location.name}, ${data.location.country},
            the weather is ${
            this.state.getter('control.tempScale') === 'C'
                ? `${Math.round(data.current.temp_c)}°C`
                : `${Math.round(data.current.temp_f)}°F`
                }, ${data.current.condition.text}, 
            feels like ${
            this.state.getter('control.tempScale') === 'C'
                ? `${Math.round(data.current.feelslike_c)}°C`
                : `${Math.round(data.current.feelslike_f)}°F`
                },
            wind ${
                this.state.getter('control.lang') === 'en'
                    ? `${Math.round(data.current.wind_mph)} m/h`
                    : `${Math.round(data.current.wind_mph)} м/с`
                }
            , humidity
            ${data.current.humidity}%`;

			const currentLang = this.state.getter('control.lang');
			if (currentLang !== 'en') {
				text = await TranslationAPI.loadTranslate(text, currentLang);
			}
			return text;
		},

	threeDaysWeatherFormat(data) {
		const currlang = this.state.getter('control.lang');
		return data.forecast.forecastday.map((dayData) => ({
			weekDay: this.getWeekDay(dayData.date, currlang),
			temp: this.state.getter('control.tempScale') === 'C'
				? `${Math.round(dayData.day.avgtemp_c)}°`
				: `${Math.round(dayData.day.avgtemp_f)}°`,
			iconUrl: data.current.is_day
				? icons[dayData.day.condition.code].day
				: icons[dayData.day.condition.code].night,
		})).slice(1);
	},

	async fiveDaysWeatherFormat(data) {
		let condition = data.forecast.forecastday[0].day.condition.text;
		let moonPhase = data.forecast.forecastday[0].astro.moon_phase;
		const currlang = this.state.getter('control.lang');
		if (currlang !== 'en') {
			condition = await TranslationAPI.loadTranslate(condition, currlang);
			moonPhase = await TranslationAPI.loadTranslate(moonPhase, currlang);
		}
		return data.forecast.forecastday.map((dayData) => ({
			date: this.getDay(dayData.date),
			month: this.getMonths(dayData.date, currlang),
			weekDay: this.getWeekDay(dayData.date, currlang),
			temp: this.state.getter('control.tempScale') === 'C'
				? `${Math.round(dayData.day.avgtemp_c)}°`
				: `${Math.round(dayData.day.avgtemp_f)}°`,
			humidity: `${dayData.day.avghumidity}%`,
			dailyChanceOfRain: `${dayData.day.daily_chance_of_rain}%`,
			condition,
			uv: dayData.day.uv,
			sunrise: dayData.astro.sunrise,
			sunset: dayData.astro.sunset,
			moonPhase,
		}));
	},
};

export default stateHelper;
