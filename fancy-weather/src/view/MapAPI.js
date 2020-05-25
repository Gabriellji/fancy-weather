import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import config from '../config/mapAPIConfig';

mapboxgl.accessToken = config.accesKey;

const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
});

export default map;
