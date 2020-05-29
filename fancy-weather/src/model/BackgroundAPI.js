import config from '../config/backgroundAPIConfig';
import state from '../state/state';

const backgroundAPI = {
	url: config.url,
	accesKey: config.accesKey,
	collectionID: config.collectionID,
	orientation: config.orientation,
	state,


	async loadBgImage(search = false) {
		let query;
		if (this.state.getter('control.is_day')) {
			query = `${this.url}?orientation=${this.orientation}&query=day,outdoor,cloud&per_page=1&client_id=${this.accesKey}`;
		} else {
			console.log('elseee');
			query = `${this.url}?orientation=${this.orientation}&query=night&per_page=1&client_id=${this.accesKey}`;
		}
		// let query = `${this.url}?orientation=${this.orientation}&query=travel&per_page=1&client_id=${this.accesKey}`;
		if (!search) {
			query = `${query}&collections=${this.collectionsID}`;
		} else {
			query = `${query}&query=${search}`;
		}
		const response = await fetch(query);
		const data = await response.json();
		return data.urls.regular;
	},
};


export default backgroundAPI;
