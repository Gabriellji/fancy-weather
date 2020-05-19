import state from './state';

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

	setWeatherCurrent(data) {
		const weatherToday = {
			place: `${data.location.name}, ${data.location.country}`,
			dataTime: data.location.localtime,
			temp_c: data.current.temp_c,
			temp_f: data.current.temp_p,
			condition: data.current.condition.text,
			iconUrl: data.current.condition.icon,
		};
		this.state.setter('weatherToday', weatherToday);
	},

	setWeatherThreeDays(data) {
		const weatherThreeDays = data.forecast.forecastday.map((dayData) => ({
			weekDay: dayData.date,
			temp_c: dayData.avgtemp_c,
			temp_f: dayData.avgtemp_p,
			iconUrl: dayData.condition.icon,
		}));

		this.state.setter('weatherThreeDays', weatherThreeDays);
	},
};

export default stateSetterAdapter;
