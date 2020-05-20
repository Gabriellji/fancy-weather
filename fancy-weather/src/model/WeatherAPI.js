import config from '../config/weatherAPIConfig';

const weatherAPI = {
	...config,
	cache: {},

	async loadWeather(city) {
		if (this.cach[city] !== undefined) {
			return this.cache[city];
		}
		const query = `${this.url}?q=${city}&days=4&key=${this.accesKey}`;
		const response = await fetch(query);
		const data = await response.json();
		return data;
	},
};


export default weatherAPI;
