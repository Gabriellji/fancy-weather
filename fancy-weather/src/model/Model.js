
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
		this.city = await this.geocodingAPI.loadGeoCodeReverse(
			this.geolocation.latitude,
			this.geolocation.longitude,
		);

		const weather = await this.weatherAPI.loadWeather(this.city);
		await this.stateSetterAdapter.setWeather(weather);

		this.stateSetterAdapter.isDay(weather.current.is_day);

		const background = await this.backgroundAPI.loadBgImage();
		this.stateSetterAdapter.setBgImage(background);

		this.state.ready();
	},

	async reloadBg() {
		const background = await this.backgroundAPI.loadBgImage();
		this.stateSetterAdapter.setBgImage(background);
	},

	async changeLang(locale) {
		this.stateSetterAdapter.setLang(locale);

		const weather = await this.weatherAPI.loadWeather(this.city);
		await this.stateSetterAdapter.setWeather(weather);

		this.stateSetterAdapter.setI18nText(
			this.i18n.getStaticText(locale),
		);
	},

	async changeTemp(tempScale) {
		this.stateSetterAdapter.setScale(tempScale);

		const weather = await this.weatherAPI.loadWeather(this.city);
		await this.stateSetterAdapter.setWeather(weather);
	},

	async searchCity(city) {
		this.stateSetterAdapter.setSearch(city);
		this.city = city;

		const geoRequest = await this.geocodingAPI.loadGeoCodeForward(city);

		this.stateSetterAdapter.setCoordinates(
			geoRequest.lat,
			geoRequest.long,
		);

		const weather = await this.weatherAPI.loadWeather(this.city);
		await this.stateSetterAdapter.setWeather(weather);

		this.reloadBg();
	},
};

export default Model;
