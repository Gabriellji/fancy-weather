import Widget from './Widget';

class SearchResult extends Widget {
	constructor() {
		super();

		this.path = [
			'main.searchingStatus',
		];

		this.searchResult = document.querySelector('.err');
	}

	draw() {
		if (this.stateGetterAdapter.getSearchingStatus()) {
			this.searchResult.style.display = 'unset';
			this.searchResult.classList.add('tracking-in-expand-fwd');
			this.searchResult.textContent = `Searching for ${this.stateGetterAdapter.getCity()}...`;
		} else {
			this.searchResult.style.display = 'none';
			this.searchResult.textContent = '';
		}
	}
}

export default SearchResult;
