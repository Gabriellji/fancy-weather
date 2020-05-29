import state from '../state/state';
import stateGetterAdapter from '../state/StateGetterAdapter';


class Widget {
	constructor() {
		this.state = state;
		this.stateGetterAdapter = stateGetterAdapter;

		this.state.on('stateUpdated', this.draw.bind(this));
		this.state.on('stateReady', this.draw.bind(this));
	}

	draw(path) {
		return this;
	}

	isStateReady() {
		return this.state.isReady;
	}
}

export default Widget;
