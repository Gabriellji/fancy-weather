import Widget from './Widget';
import state from '../state/state';

class Buttons extends Widget {
	constructor() {
		super();
		this.state = state;

		this.buttonsPanel = document.querySelector('.buttons');
		this.oneMoreButtonBox = document.querySelector('.temperature__box');
	}

	draw() {
		this.createPanel();
	}

	createPanel() {
		this.createClickMeButton();
		this.createLanguageButtons();
		this.createTemperatureButtons();
	}

	createClickMeButton() {
		const buttonBox = document.createElement('div');
		buttonBox.classList.add('click-me__box');

		const button = document.createElement('button');
		button.classList.add('c-smileyButton');
		button.textContent = 'Click me'; // &nbsp;

		const smileFace = document.createElement('span');
		smileFace.classList.add('c-smileyButton__face');
		smileFace.style = '::before';

		button.appendChild(smileFace);
		buttonBox.appendChild(button);

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
			span.classList.add('btn');
			span.innerHTML = spanInnerText[i];
			a.appendChild(span);
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
			span.classList.add('btn-temp');
			span.innerHTML = spanInnerText[i];
			a.appendChild(span);
			temperatureBox.appendChild(a);
		}
		this.buttonsPanel.appendChild(temperatureBox);
	}
}

export default Buttons;
