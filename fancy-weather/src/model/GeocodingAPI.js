import config from '../config/geocodingAPIConfig';

const geocodingAPI = {
	...config,

	async loadGeoCodeForward(placeName, debug = false) {
		let query = `${this.geocodingUrl}`;
		if (!debug) {
			query = `${query}?q=${placeName}&key=${this.accesKey}`;
		} else {
			query = `${query}?${debug}`;
		}
		const response = await fetch(query);
		if (!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		return data;
	},

	async loadGeoCodeReverse(lat, long, debug = false) {
		let query = `${this.geocodingUrl}`;
		if (!debug) {
			query = `${query}?q=${lat}+${long}&key=${this.accesKey}`;
		} else {
			query = `${query}?${debug}`;
		}
		const response = await fetch(query);
		if (!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		return data;
	},
};


export default geocodingAPI;
