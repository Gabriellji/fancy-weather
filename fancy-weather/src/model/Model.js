
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

	preInit() {
		let options = window.localStorage.getItem('options');
		if (options) {
			options = JSON.parse(options);
			this.stateSetterAdapter.setOptions(options.lang, options.scale);
		} else {
			this.stateSetterAdapter.setOptions('en', 'C');
		}
		this.init();
	},

	async init() {
		this.stateSetterAdapter.setI18nText(
			this.i18n.getStaticText(
				this.stateGetterAdapter.getLang(),
			),
		);
		try {
			const geoRequest = await geolocationAPI.loadLocation();
			this.geolocation = geoRequest.coords;
		} catch (err) {
			this.stateSetterAdapter.setErrors('Invalid Request');
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
		try {
			const weather = await this.weatherAPI.loadWeather(this.stateGetterAdapter.getCity());
			await this.stateSetterAdapter.setWeather(weather);

			this.stateSetterAdapter.isDay(weather.current.is_day);
		} catch (err) {
			this.stateSetterAdapter.setErrors('Invalid Request');
		}


		try {
			const background = await this.backgroundAPI.loadBgImage();
			this.stateSetterAdapter.setBgImage(background);
		} catch (err) {
			this.stateSetterAdapter.setErrors('Something went wrong =( ...');
			this.stateSetterAdapter.setBgImage('/assets/default.jpg');
		}
		this.state.ready();
	},

	async reloadBg() {
		try {
			const background = await this.backgroundAPI.loadBgImage();
			this.stateSetterAdapter.setBgImage(background);
		} catch (err) {
			this.stateSetterAdapter.setErrors('Something went wrong =( ...');
		}
	},

	async changeLang(locale) {
		this.stateSetterAdapter.setLang(locale);

		try {
			const weather = await this.weatherAPI.loadWeather(this.stateGetterAdapter.getCity());
			await this.stateSetterAdapter.setWeather(weather);
		} catch (err) {
			this.stateSetterAdapter.setErrors('Invalid Request');
		}


		this.stateSetterAdapter.setI18nText(
			this.i18n.getStaticText(locale),
		);
	},

	async changeTemp(tempScale) {
		this.stateSetterAdapter.setScale(tempScale);

		try {
			const weather = await this.weatherAPI.loadWeather(this.stateGetterAdapter.getCity());
			await this.stateSetterAdapter.setWeather(weather);
		} catch (err) {
			this.stateSetterAdapter.setErrors('Invalid Request');
		}
	},

	async searchCityVoice() {
		try {
			const city = await speechRecognition.getSpeech();
			this.searchCity(city);
			this.reloadBg();
		} catch (err) {
			this.stateSetterAdapter.setErrors('Invalid Request');
		}
	},

	async searchCity(city) {
		this.stateSetterAdapter.setSearch(city);
		this.stateSetterAdapter.setCity(city);

		this.stateSetterAdapter.setSearchingStatus(true);

		try {
			const geoRequest = await this.geocodingAPI.loadGeoCodeForward(city);

			this.stateSetterAdapter.setCoordinates(
				geoRequest.lat,
				geoRequest.long,
			);
		} catch (err) {
			this.stateSetterAdapter.setErrors('Invalid Request');
		}

		try {
			const weather = await this.weatherAPI.loadWeather(city);
			await this.stateSetterAdapter.setWeather(weather);
		} catch (err) {
			this.stateSetterAdapter.setErrors('Invalid Request');
		}


		this.reloadBg();
		this.stateSetterAdapter.setSearchingStatus(false);
	},
};

export default Model;
