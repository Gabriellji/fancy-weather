import state from './state';
import helper from './StateHelper';


const stateSetterAdapter = {
	state,
	helper,

	setCity(city) {
		this.state.setter('main.city', city);
	},

	setOptions(locale, tempScale) {
		this.state.setter('control.lang', locale);
		this.state.setter('control.tempScale', tempScale);
	},

	setLang(locale) {
		this.state.setter('control.lang', locale);
	},

	setScale(tempScale) {
		this.state.setter('control.tempScale', tempScale);
	},

	setSearch(search) {
		this.state.setter('control.searchValue', search);
	},

	setI18nText(lang) {
		const langKeys = Object.keys(lang);
		langKeys.forEach((key) => {
			this.state.setter(`i18n.${key}`, lang[key]);
		});
	},

	setCoordinates(lat, long) {
		this.state.setter('map.lat', lat);
		this.state.setter('map.long', long);
	},

	setBgImage(image) {
		this.state.setter('main.bgUrl', image);
	},

	isDay(day) {
		this.state.setter('control.is_day', day);
	},

	async setWeather(data) {
		await this.setWeatherCurrent(data);
		this.setWeatherThreeDays(data);
		await this.setWeatherFiveDays(data);
	},

	async setWeatherCurrent(data) {
		const weatherToday = await this.helper.currentWeatherFormat(data);
		this.state.setter('weatherToday', weatherToday);
	},

	setWeatherThreeDays(data) {
		const weatherThreeDays = this.helper.threeDaysWeatherFormat(data);
		this.state.setter('weatherThreeDays', weatherThreeDays);
	},

	async setWeatherFiveDays(data) {
		const weatherFiveDays = await this.helper.fiveDaysWeatherFormat(data);
		this.state.setter('weatherFiveDays', weatherFiveDays);
	},
};

export default stateSetterAdapter;
