class Buttons {
	constructor() {
		this.buttonsPanel = document.querySelector('.buttons');
		this.buttonBox = document.querySelector('languagues__box');
	}

	createPanel() {
		this.createClickMeButton();
		this.createButtons();
	}

	createClickMeButton() {
		const buttonBox = document.createElement('div');
		buttonBox.classList.add('click-me__box');

		const button = document.createElement('button');
		button.classList.add('c-smileyButton');
		button.textContent = '&nbsp;Click me';

		const smileFace = document.createElement('span');
		smileFace.classList.add('c-smileyButton__face');

		button.appendChild(smileFace);
		buttonBox.appendChild(button);

		this.buttonsPanel.appendChild(buttonBox);
	}

	createButtons() {
		const spanInnerText = ['EN', 'RU', 'BE', '°F', '°C'];
		const arrayLength = spanInnerText.length;
		let a;
		let span;

		for (let i = 0; i < arrayLength; i += 1) {
			a = document.createElement('a');
			span = document.createElement('span');
			a.classList.add('my-super-cool-btn');
			a.setAttribute('href', '#');
			span.classList.add('btn');
			span.innerHTML = spanInnerText[i];
			a.appendChild(span);
			this.buttonBox[0].appendChild(a);
		}
	}
}

export default Buttons;
