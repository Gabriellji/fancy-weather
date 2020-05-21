import state from './state';
import TranslationAPI from '../model/TranslationAPI';

const stateSetterAdapter = {
	state,
	setI18nText(lang) {
		const langKeys = Object.keys(lang);
		langKeys.forEach((key) => {
			this.state.setter(`${key}.i18n`, lang[key]);
		});
	},

	setBgImage(image) {
		this.state.setter('main.bgUrl', image);
	},

	setWeather(data) {
		this.setWeatherCurrent(data);
		this.setWeatherThreeDays(data);
	},

	async setWeatherCurrent(data) {
		let place = `${data.location.name}, ${data.location.country}`;
		let dataTime = data.location.localtime;
		let condition = data.current.condition.text;

		const currentLang = this.state.getter('control.lang');
		if (currentLang !== 'en') {
			place = await TranslationAPI.loadTranslate(place, currentLang);
			dataTime = await TranslationAPI.loadTranslate(dataTime, currentLang);
			condition = await TranslationAPI.loadTranslate(condition, currentLang);
		}
		const weatherToday = {
			place: `${data.location.name}, ${data.location.country}`,
			dataTime: data.location.localtime,
			temp: this.state.getter('control.tempScale') === 'c'
				? data.current.temp_c
				: data.current.temp_f,
			condition: data.current.condition.text,
			iconUrl: data.current.condition.icon,
			feelsLike: this.state.getter('control.tempScale') === 'c'
				? data.current.feelslike_c
				: data.current.feelslike_f,
			wind: data.current.wind_kph,
			humidity: `${data.current.humidity}%`,
			uv: data.current.uv,
			sunrise: data.astro.sunrise,
			sunset: data.astro.sunset,
		};
		this.state.setter('weatherToday', weatherToday);
	},

	setWeatherThreeDays(data) {
		const weatherThreeDays = data.forecast.forecastday.map((dayData) => ({
			weekDay: this.setWeekDay(dayData.date),
			temp: this.state.getter('control.tempScale') === 'c'
				? dayData.avgtemp_c
				: dayData.avgtemp_f,
			iconUrl: dayData.condition.icon,
		}));

		this.state.setter('weatherThreeDays', weatherThreeDays);
	},
};

export default stateSetterAdapter;
