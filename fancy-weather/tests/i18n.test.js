import i18n from '../src/model/I18n';
import state from '../src/state/state';


describe('i18n test', () => {
    test('getStaticText', () => {
        expect(i18n.getStaticText('en')).not.toBeUndefined();
    });
    test('getStaticText structure', () => {
        expect(typeof i18n.getStaticText('en')).toEqual('object');
    });
    const lang = { 
        main: {
            title: 'some title',
            description: 'descr',
        },
        control: {
            searchPlaceholder: 'search',
            searchBtnTxt: 'action',
        },
        weatherToday: {
            feelsLike: 'cold',
            wind: 'fast',
            humidity: '100%',
        },
        map: {
            latitude: '454.35.3.43',
            longitude: '100'
        },
    };
    test('setStaticTest', () => {
        i18n.setStaticText(lang);
        expect(state.getter('main.i18n.title')).toEqual(lang.main.title);
    });
});