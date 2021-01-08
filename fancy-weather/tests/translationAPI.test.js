import fetch from 'node-fetch';
import TranslationAPI from '../src/model/TranslationAPI';

global.fetch = fetch;

describe('TranslationAPI test', () => {
	test('work', async () => {
		const translate = await TranslationAPI.loadTranslate('hello', 'ru');
		expect(translate).not.toBeUndefined();
	});

	test('is string', async () => {
		const translate = await TranslationAPI.loadTranslate('hello', 'ru');
		expect(typeof translate).toBe('string');
	});

	test('error', async () => {
		let msg = '';
		try {
			await TranslationAPI.loadTranslate('hello', 'ru', 'fail');
		} catch (err) {
			msg = err.message;
		}
		expect(msg).toBe('400');
	});
});
