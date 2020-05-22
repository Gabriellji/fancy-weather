import config from '../config/translationAPIConfig';

const translationAPI = {
	...config,

	async loadTranslate(text, lang, debug = false) {
		let query = `${this.url}`;
		if (!debug) {
			query = `${query}?text=${text}&lang=en-${lang}&key=${this.accesKey}`;
		} else {
			query = `${query}?${debug}`;
		}
		const response = await fetch(query);
		if (!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		return data.text[0];
	},
};


export default translationAPI;
