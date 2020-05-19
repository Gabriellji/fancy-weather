import config from '../config/weatherAPIConfig';

const weatherAPI = {
	...config,

	async loadWeather(city) {
		const query = `${this.url}?q=${city}&days=4&key=${this.accesKey}`;
		const response = await fetch(query);
		const data = await response.json();
		return data;
	},
};


export default weatherAPI;
