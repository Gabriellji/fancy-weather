import Widget from './Widget';

class Search extends Widget {
	constructor() {
		super();

		this.path = [
			'control',
			'control.searchValue',
			'control.lang',
			'i18n',
			'i18n.control',
			'i18n.default',
		];

		this.searchContainer = document.querySelector('.search');
		this.labelSpan = document.querySelector('.input__label-content');
		this.input = document.querySelector('#input-7');
		this.cleanButton = document.querySelector('.clean');
		this.searchButton = document.querySelector('.btn-search');
		this.voiceButton = document.querySelector('.btn-voice');

		this.searchButton.addEventListener('click', () => {
			this.model.searchCity(this.input.value);
			this.input.value = '';
		});

		this.voiceButton.addEventListener('click', () => {
			this.model.searchCityVoice(this.input.value);
		});

		this.input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				this.model.searchCity(this.input.value);
			}
		});

		this.cleanButton.addEventListener('click', () => {
			this.input.value = '';
			this.input.focus();
		});
	}

	draw() {
		if (this.isStateReady()) {
			const text = this.stateGetterAdapter.getInputText();
			this.createSearchPanel(text);
		}
	}

	createSearchPanel(text) {
		this.labelSpan.setAttribute('data-content', text.i18n.example);
		this.labelSpan.textContent = text.i18n.searchPlaceholder;
	}
}

export default Search;
