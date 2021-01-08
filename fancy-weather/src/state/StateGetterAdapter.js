import state from './state';

const stateGetterAdapter = {
	state,

	getSearchingStatus() {
		return this.state.getter('main.searchingStatus');
	},

	getOptions() {
		return {
			lang: this.state.getter('control.lang'),
			scale: this.state.getter('control.tempScale'),
		};
	},

	getCity() {
		return this.state.getter('main.city');
	},

	getBackground() {
		return this.state.getter('main.bgUrl');
	},

	getLang() {
		return this.state.getter('control.lang');
	},

	getMainWeather() {
		const weather = this.state.getter('weatherToday');
		const i18n = this.state.getter('i18n.default.weatherToday');
		return { ...weather, i18n: { ...i18n } };
	},

	getThreeDaysForecast() {
		const weather = this.state.getter('weatherThreeDays');
		return weather;
	},

	getFiveDaysForecast() {
		const weather = this.state.getter('weatherFiveDays');
		const i18n = this.state.getter('i18n.default.weatherFiveDays');
		return { weather: [...weather], i18n: { ...i18n } };
	},

	getCoordinates() {
		const lat = this.state.getter('map.lat');
		const long = this.state.getter('map.long');
		const i18n = this.state.getter('i18n.default.map');
		return { lat, long, i18n: { ...i18n } };
	},

	getInputText() {
		const text = this.state.getter('control');
		const i18n = this.state.getter('i18n.default.control');
		return { text, i18n: { ...i18n } };
	},

	getErrors() {
		return this.state.errorGetter();
	},
};

export default stateGetterAdapter;
