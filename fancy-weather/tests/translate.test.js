import TranslationAPI from '../src/model/TranslationAPI';

describe('TranslationAPI test', () => {
	test('work', () => {
		expect(TranslationAPI.loadTranslate('hello', 'ru')).not.toBeUndefined();
	});
});
