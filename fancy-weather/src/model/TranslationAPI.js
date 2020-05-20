import config from '../config/translationAPIConfig';

const translationAPI = {
	...config,

	async loadTranslate(text, lang) {
		const query = `${this.url}?text=${text}&lang=en-${lang}&key=${this.accesKey}`;
		const response = await fetch(query);
		const data = await response.json();
		return data.text[0];
	},
};


export default translationAPI;
