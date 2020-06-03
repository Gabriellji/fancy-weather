import state from '../state/state';
import stateGetterAdapter from '../state/StateGetterAdapter';
import Widget from './Widget';

class Errors extends Widget {
	constructor() {
		super();
		this.state = state;
		this.stateGetterAdapter = stateGetterAdapter;
		this.path = [
			'errors',
		];

		this.errorsBox = document.querySelector('.errors');
		this.textBox = document.querySelector('.new-errors');
	}

	draw() {
		this.showErrors();
	}

	showErrors() {
		const errors = this.stateGetterAdapter.getErrors();
		this.textBox.textContent = errors;
		this.textBox.style.display = 'unset';
		setTimeout(() => {
			this.textBox.style.display = 'none';
		}, 9000);
	}
}

export default Errors;
