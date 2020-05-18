import state from '../state/state';

const i18n = {
    state: state,

    getStaticText(locale) {
        return require(`../config/i18n/${locale}/lang.js`);  
    },

    setStaticText(lang) {
        const langKeys = Object.keys(lang);
        langKeys.forEach((key) => {
            this.state.setter(`${key}.i18n`, lang[key]);
        });
    }
}

export default i18n;