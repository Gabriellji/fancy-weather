import Widget from './Widget';

class Background extends Widget {
	constructor() {
		super();

		this.body = document.querySelector('body');
	}

	draw(path) {
		if (this.isStateReady()) {
			const img = this.stateGetterAdapter.getBackground();
			this.body.style.background = `
            linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) center center / cover fixed,
             url(${img})center center / cover fixed`;
		}
	}
}

export default Background;
