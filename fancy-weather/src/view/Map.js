import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import Widget from './Widget';
import config from '../config/mapAPIConfig';


class Map extends Widget {
	constructor() {
		super();

		this.weatherWrapper = document.querySelector('.weazzz');
		this.createMapBox();
		mapboxgl.accessToken = config.accesKey;

		this.mapBoxgl = new mapboxgl.Map({
			container: 'map',
			zoom: 8,
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
		latitude.textContent = `${coords.i18n.latitude}: ${coords.lat}`;
		const longitude = document.createElement('p');
		longitude.classList.add('longitude');
		longitude.textContent = `${coords.i18n.longitude}: ${coords.long}`;

		this.coordinates.appendChild(latitude);
		this.coordinates.appendChild(longitude);	
	}
}

export default Map;
