
import backgroundAPI from './BackgroundAPI';
import geocodingAPI from './GeocodingAPI';
import geolocationAPI from './GeolocationAPI';
import translationAPI from './TranslationAPI';
import weatherAPI from './WeatherAPI';
import i18n from './I18n';
import state from '../state/state';
import stateHelper from '../state/StateHelper';
import stateSetterAdapter from '../state/StateSetterAdapter';

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

	init() {
		this.stateSetterAdapter.setOptions('en', 'C');
		this.stateSetterAdapter.setI18nText(this.i18n.getStaticText());
		this.geolocation = geolocationAPI.loadLocation();
		this.stateSetterAdapter.setCoordinates(
			this.geolocation.latitude,
			this.geolocation.longitude,
		);
	},
};

export default Model;
