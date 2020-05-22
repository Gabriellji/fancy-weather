const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbGppIiwiYSI6ImNrYWlia2RzZzBnbGUycnRpa3hxcmoyMWsifQ.XWfWA24Tsh69PdXI3XQjlg';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
});
