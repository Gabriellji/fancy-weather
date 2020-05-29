import Widget from './Widget';

class Search extends Widget {
	constructor() {
		super();

		this.searchContainer = document.querySelector('.search');
		this.labelSpan = document.querySelector('.input__label-content');
		this.input = document.querySelector('#input-7');
		this.searchButton = document.querySelector('.btn-search');

		this.searchButton.addEventListener('click', () => {
			this.model.searchCity(this.input.value);
		});

		this.input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				this.model.searchCity(this.input.value);
			}
		});
	}

	draw(path) {
		if (this.isStateReady()) {
			const text = this.stateGetterAdapter.getInputText();
			this.createSearchPanel(text);
		}
	}

	createSearchPanel(text) {
		this.labelSpan.setAttribute('data-content', text.i18n.searchPlaceholder);
		this.labelSpan.textContent = text.i18n.searchPlaceholder;
	}
}

export default Search;
