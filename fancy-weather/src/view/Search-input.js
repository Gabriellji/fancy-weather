import Widget from './Widget';

class Search extends Widget {
	constructor() {
		super();

		this.labelSpan = document.querySelector('.input__label-content');
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
