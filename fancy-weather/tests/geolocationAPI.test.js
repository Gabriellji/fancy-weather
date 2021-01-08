import geolocate from 'mock-geolocation';
import geolocationAPI from '../src/model/GeolocationAPI';


describe('GeolocationAPI test', () => {
	const input = {
		accuracy: 5,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		latitude: 50,
		longitude: 10,
		speed: null,
		timestamp: 3000,
	};

	const output = {
		coords: {
			accuracy: 5,
			altitude: null,
			altitudeAccuracy: null,
			heading: null,
			latitude: 50,
			longitude: 10,
			speed: null,
		},
		timestamp: 3000,
	};
	test('work', async () => {
		geolocate.use();
		geolocationAPI.loadLocation()
			.then((data) => {
				expect(data).not.toEqual(output);
			});
		geolocate.send(input);
	});
});
