import state from './state';
import helper from './StateHelper';


const stateSetterAdapter = {
	state,
	helper,
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
		const weatherToday = this.helper.currentWeatherFormat(data);
		this.state.setter('weatherToday', weatherToday);
	},

	setWeatherThreeDays(data) {
		const weatherThreeDays = this.helper.threeDaysWeatherFormat(data);
		this.state.setter('weatherThreeDays', weatherThreeDays);
	},
};

export default stateSetterAdapter;
