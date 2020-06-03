import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import Widget from './Widget';
import config from '../config/mapAPIConfig';


class Map extends Widget {
	constructor() {
		super();

		this.path = [
			'map',
			'map.lat',
			'map.long',
			'i18n',
			'i18n.control',
			'i18n.control.lang',
			'i18n.default',
		];

		this.weatherWrapper = document.querySelector('.weazzz');
		this.createMapBox();
		mapboxgl.accessToken = config.accesKey;

		this.mapBoxgl = new mapboxgl.Map({
			container: 'map',
			zoom: 10,
			style: 'mapbox://styles/mapbox/streets-v11',
		});
	}

	draw(path) {
		if (this.isStateReady()) {
			this.coordinates.innerHTML = '';
			const coords = this.stateGetterAdapter.getCoordinates();
			this.createMap(coords);
			this.mapBoxgl.setCenter([coords.long, coords.lat]);
		}
	}

	truncate(n) {
		return n > 0 ? Math.floor(n) : Math.ceil(n);
	}

	getDMS(dd, longOrLat) {
		this.hemisphere = /^[WE]|(?:lon)/i.test(longOrLat)
			? dd < 0
				? 'W'
				: 'E'
			: dd < 0
				? 'S'
				: 'N';

		const absDD = Math.abs(dd);
		const degrees = this.truncate(absDD);
		const minutes = this.truncate((absDD - degrees) * 60);
		const seconds = ((absDD - degrees - minutes / 60) * Math.pow(60, 2)).toFixed(2);

		const dmsArray = [degrees, minutes, seconds, this.hemisphere];
		return `${dmsArray[0]}°${dmsArray[1]}'${dmsArray[2]}" ${dmsArray[3]}`;
	}

	createMapBox() {
		this.mapBox = document.createElement('div');
		this.mapBox.classList.add('map');

		const map = document.createElement('div');
		map.classList.add('map__map');
		map.setAttribute('id', 'map');

		this.coordinates = document.createElement('div');
		this.coordinates.classList.add('map__coordinates');

		this.mapBox.appendChild(map);
		this.mapBox.appendChild(this.coordinates);

		this.weatherWrapper.appendChild(this.mapBox);
	}

	createMap(coords) {
		const latitude = document.createElement('p');
		latitude.classList.add('latitude');
		const lat = this.getDMS(coords.lat, 'lat');
		latitude.textContent = `${coords.i18n.latitude} : ${lat}`;
		const longitude = document.createElement('p');
		longitude.classList.add('longitude');
		const long = this.getDMS(coords.long, 'long');
		longitude.textContent = `${coords.i18n.longitude} : ${long}`;

		this.coordinates.appendChild(latitude);
		this.coordinates.appendChild(longitude);
	}
}

export default Map;
