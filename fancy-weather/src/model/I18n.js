import state from '../state/state';

const i18n = {
	state,

	getStaticText(locale) {
		return require(`../config/i18n/${locale}/lang.js`);
	},
};

export default i18n;
