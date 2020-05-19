import i18n from '../src/model/I18n';

describe('i18n test', () => {
	test('getStaticText', () => {
		expect(i18n.getStaticText('en')).not.toBeUndefined();
	});
	test('getStaticText structure', () => {
		expect(typeof i18n.getStaticText('en')).toEqual('object');
	});
});
