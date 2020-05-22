import i18n from '../src/model/I18n';

describe('i18n test', () => {
	test('is en', () => {
		expect(i18n.getStaticText('en')).not.toBeUndefined();
	});
	test('getStaticText structure', () => {
		expect(typeof i18n.getStaticText('en')).toEqual('object');
	});

	test('is ru', () => {
		expect(i18n.getStaticText('ru')).not.toBeUndefined();
	});

	test('is be', () => {
		expect(i18n.getStaticText('be')).not.toBeUndefined();
	});
});
