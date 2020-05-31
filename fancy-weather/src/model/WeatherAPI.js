import config from '../config/weatherAPIConfig';

const weatherAPI = {
	...config,
	cache: {},

	async loadWeather(city, debug = false) {
		if (this.cache[city] !== undefined) {
			return this.cache[city];
		}
		let query = `${this.url}`;
		if (!debug) {
			query = `${query}?q=${city}&days=5&key=${this.accesKey}`;
		} else {
			query = `${query}?${debug}`;
		}
		const response = await fetch(query);
		if (!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		this.cache[city] = data;
		return data;
	},
};

export default weatherAPI;
