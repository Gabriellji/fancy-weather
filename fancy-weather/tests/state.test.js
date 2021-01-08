import state from '../src/state/state.js';

describe('State test', () => {
	test('setter/getter', () => {
		const title = 'NewTitle';
		state.setter('i18n.main', title);
		expect(state.getter('i18n.main')).toEqual(title);
	});

	test('rigth path', () => {
		const title = 'NewTitle';
		state.setter('main.i18n.title', title);
		expect(state.store.main.i18n.title).toEqual(title);
	});
});
