import state from './state';
import helper from './StateHelper';


const stateSetterAdapter = {
	state,
	helper,

	setOptions(locale, tempScale) {
		this.state.setter('control.lang', locale);
		this.state.setter('control.tempScale', tempScale);
	},

	setI18nText(lang) {
		const langKeys = Object.keys(lang);
		langKeys.forEach((key) => {
			this.state.setter(`${key}.i18n`, lang[key]);
		});
	},

	setCoordinates(lat, long) {
		this.state.setter('map.lat', lat);
		this.state.setter('map.long', long);
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
