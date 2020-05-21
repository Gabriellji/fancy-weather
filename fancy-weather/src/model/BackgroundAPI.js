import config from '../config/backgroundAPIConfig';

const backgroundAPI = {
	url: config.url,
	accesKey: config.accesKey,
	collectionID: config.collectionID,
	orientation: config.orientation,


	async loadBgImage(search = false) {
		let query = `${this.url}?orientation=${this.orientation}&per_page=1&client_id=${this.accesKey}`;
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
