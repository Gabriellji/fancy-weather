import state from '../state/state';

const i18n = {
	state,

	getStaticText(locale = 'en') {
		const lang = require(`../config/i18n/${locale}/lang.js`);
		return lang;
	},
};

export default i18n;
