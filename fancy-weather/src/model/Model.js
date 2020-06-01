
import backgroundAPI from './BackgroundAPI';
import geocodingAPI from './GeocodingAPI';
import geolocationAPI from './GeolocationAPI';
import translationAPI from './TranslationAPI';
import weatherAPI from './WeatherAPI';
import i18n from './I18n';
import state from '../state/state';
import stateHelper from '../state/StateHelper';
import stateSetterAdapter from '../state/StateSetterAdapter';
import stateGetterAdapter from '../state/StateGetterAdapter';
import speechRecognition from './SpeechRecognition';

const Model = {
	backgroundAPI,
	geocodingAPI,
	geolocationAPI,
	translationAPI,
	weatherAPI,
	i18n,

	state,
	stateHelper,
	stateSetterAdapter,
	stateGetterAdapter,

	async init() {
		this.stateSetterAdapter.setOptions('en', 'C');
		this.stateSetterAdapter.setI18nText(
			this.i18n.getStaticText(
				this.stateGetterAdapter.getLang(),
			),
		);
		try {
			const geoRequest = await geolocationAPI.loadLocation();
			this.geolocation = geoRequest.coords;
		} catch (err) {
			this.geolocation = { latitude: '53.9', longitude: '27.57' };
		}
		this.stateSetterAdapter.setCoordinates(
			this.geolocation.latitude,
			this.geolocation.longitude,
		);
		this.stateSetterAdapter.setCity(await this.geocodingAPI.loadGeoCodeReverse(
			this.geolocation.latitude,
			this.geolocation.longitude,
		));

		const weather = await this.weatherAPI.loadWeather(this.stateGetterAdapter.getCity());
		await this.stateSetterAdapter.setWeather(weather);

		this.stateSetterAdapter.isDay(weather.current.is_day);

		try {
			const background = await this.backgroundAPI.loadBgImage();
			this.stateSetterAdapter.setBgImage(background);
		} catch (err) {
			this.stateSetterAdapter.setBgImage('/assets/default.jpg');
		}
		this.state.ready();
	},

	async reloadBg() {
		const background = await this.backgroundAPI.loadBgImage();
		this.stateSetterAdapter.setBgImage(background);
	},

	async changeLang(locale) {
		this.stateSetterAdapter.setLang(locale);

		const weather = await this.weatherAPI.loadWeather(this.stateGetterAdapter.getCity());
		await this.stateSetterAdapter.setWeather(weather);

		this.stateSetterAdapter.setI18nText(
			this.i18n.getStaticText(locale),
		);
	},

	async changeTemp(tempScale) {
		this.stateSetterAdapter.setScale(tempScale);

		const weather = await this.weatherAPI.loadWeather(this.stateGetterAdapter.getCity());
		await this.stateSetterAdapter.setWeather(weather);
	},

	async searchCityVoice() {
		const city = await speechRecognition.getSpeech();
		this.searchCity(city);
	},

	async searchCity(city) {
		this.stateSetterAdapter.setSearch(city);
		this.stateSetterAdapter.setCity(city);

		const geoRequest = await this.geocodingAPI.loadGeoCodeForward(city);

		this.stateSetterAdapter.setCoordinates(
			geoRequest.lat,
			geoRequest.long,
		);

		const weather = await this.weatherAPI.loadWeather(city);
		await this.stateSetterAdapter.setWeather(weather);

		this.reloadBg();
	},
};

export default Model;
