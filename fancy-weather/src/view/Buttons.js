import Widget from './Widget';
import state from '../state/state';

class Buttons extends Widget {
	constructor() {
		super();
		this.state = state;

		this.buttonsPanel = document.querySelector('.buttons');
	}

	draw() {
		this.buttonsPanel.innerHTML = '';
		this.createPanel();
	}

	createPanel() {
		this.createClickMeButton();
		this.createLanguageButtons();
		this.createTemperatureButtons();
		this.createVolumeButtons();
	}

	createClickMeButton() {
		const buttonBox = document.createElement('div');
		buttonBox.classList.add('click-me__box');

		const button = document.createElement('button');
		button.classList.add('c-smileyButton');
		button.textContent = '&nbsp';
		button.textContent = 'Click'; // &nbsp;

		const smileFace = document.createElement('span');
		smileFace.classList.add('c-smileyButton__face');
		smileFace.style = '::before';

		button.appendChild(smileFace);
		buttonBox.appendChild(button);

		button.addEventListener('click', (() => {
			this.model.reloadBg();
		}));

		this.buttonsPanel.appendChild(buttonBox);
	}

	createLanguageButtons() {
		const languageBox = document.createElement('div');
		languageBox.classList.add('languagues__box');
		const spanInnerText = ['en', 'ru', 'be'];
		const arrayLength = spanInnerText.length;
		let a;
		let span;

		for (let i = 0; i < arrayLength; i += 1) {
			a = document.createElement('a');
			span = document.createElement('span');
			if (this.state.getter('control.lang') === spanInnerText[i]) {
				a.classList.add('active');
			}
			a.classList.add('my-super-cool-btn');
			a.setAttribute('href', '#');
			span.setAttribute('data-lang', spanInnerText[i]);
			span.classList.add('btn');
			span.innerHTML = spanInnerText[i];
			a.appendChild(span);

			span.addEventListener('click', ((e) => {
				this.model.changeLang(e.target.getAttribute('data-lang'));
			}));

			languageBox.appendChild(a);
		}
		this.buttonsPanel.appendChild(languageBox);
	}

	createTemperatureButtons() {
		const temperatureBox = document.createElement('div');
		temperatureBox.classList.add('temperature__box');
		const spanInnerText = ['F', 'C'];
		const arrayLength = spanInnerText.length;
		let a;
		let span;

		for (let i = 0; i < arrayLength; i += 1) {
			a = document.createElement('a');
			span = document.createElement('span');
			if (this.state.getter('control.tempScale') === spanInnerText[i]) {
				a.classList.add('active');
			}
			a.classList.add('my-super-cool-btn-temp');
			a.setAttribute('href', '#');
			span.setAttribute('data-temp', spanInnerText[i]);
			span.classList.add('btn-temp');
			span.innerHTML = spanInnerText[i];
			a.appendChild(span);

			span.addEventListener('click', ((e) => {
				this.model.changeTemp(e.target.getAttribute('data-temp'));
			}));

			temperatureBox.appendChild(a);
		}
		this.buttonsPanel.appendChild(temperatureBox);
	}

	createVolumeButtons() {
		const volumeBox = document.createElement('div');
		volumeBox.classList.add('volume__box');

		const volumeStart = document.createElement('span');
		const volumeStop = document.createElement('span');

		volumeStart.classList.add('btn-volume-start', 'shake-top');
		volumeStop.classList.add('btn-volume-stop', 'shake-top');

		const imgStart = document.createElement('img');
		const imgStop = document.createElement('img');

		imgStart.classList.add('img-voice');
		imgStop.classList.add('img-voice');

		imgStart.setAttribute('src', 'assets/volume-up-solid.svg');
		imgStop.setAttribute('src', 'assets/volume-off-solid.svg');

		volumeStart.appendChild(imgStart);
		volumeStop.appendChild(imgStop);

		volumeBox.appendChild(volumeStart);
		volumeBox.appendChild(volumeStop);
		this.buttonsPanel.appendChild(volumeBox);

		volumeStart.addEventListener('click', (() => {
			this.model.startVoiceWeather();
		}));

		volumeStop.addEventListener('click', (() => {
			this.model.stopVoiceWeather();
		}));
	}
}

export default Buttons;
