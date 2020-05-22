import TranslationAPI from '../model/TranslationAPI';
import state from './state';

const stateHelper = {
	state,
	getWeekDay(day, local) {
		const configPath = `../config/i18n/${local}/weekdays.js`;
		const weekdays = require(configPath);
		const weekdayNumber = new Date(day).getDay();
		return weekdays.default[weekdayNumber];
	},

	getDateTime(dateString) {
		const dateArr = dateString.split(' ');
		const time = dateArr[1];
		const finalDate = new Date(dateString);
		return `${finalDate.toDateString()} ${time}`;
	},

	async currentWeatherFormat(data) {
		let place = `${data.location.name}, ${data.location.country}`;
		let dataTime = data.location.localtime;
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
			temp: this.state.getter('control.tempScale') === 'C'
				? data.current.temp_c
				: data.current.temp_f,
			condition,
			iconUrl: data.current.condition.icon,
			feelsLike: this.state.getter('control.tempScale') === 'C'
				? data.current.feelslike_c
				: data.current.feelslike_f,
			wind: data.current.wind_kph,
			humidity: `${data.current.humidity}%`,
		};
	},

	threeDaysWeatherFormat(data) {
		return data.forecast.forecastday.map((dayData) => ({
			weekDay: this.getWeekDay(dayData.date, 'en'),
			temp: this.state.getter('control.tempScale') === 'C'
				? dayData.avgtemp_c
				: dayData.avgtemp_f,
			iconUrl: dayData.condition.icon,
		}));
	},
};

export default stateHelper;
