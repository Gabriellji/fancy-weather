
class Tips {
	constructor() {
		this.tipsBox = document.querySelector('.helper-overlay');
		this.tipsIcon = document.querySelector('.shake-lr-light');
		this.closeIcon = document.querySelector('.close-helper');
		this.body = document.querySelector('body');

		this.tipsIcon.addEventListener('click', () => {
			this.tipsBox.style.top = '0';
		});

		this.closeIcon.addEventListener('click', () => {
			this.tipsBox.style.top = '-100%';
		});

		// this.body.addEventListener('click', (e) => {
		// 	if (!e.contains('.shake-lr-light')) {
		// 		this.tipsBox.style.top = '-100%';
		// 	}
		// });
	}
}

export default Tips;
