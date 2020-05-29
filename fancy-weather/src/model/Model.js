
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
		const city = await this.geocodingAPI.loadGeoCodeReverse(
			this.geolocation.latitude,
			this.geolocation.longitude,
		);
		const background = await this.backgroundAPI.loadBgImage();
		this.stateSetterAdapter.setBgImage(background);

		const weather = await this.weatherAPI.loadWeather(city);
		await this.stateSetterAdapter.setWeather(weather);

		this.state.ready();
	},
};

export default Model;
