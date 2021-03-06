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
			query = `${this.url}?orientation=${this.orientation}&query=cloud,islands,outdoor,asia&per_page=1&client_id=${this.accesKey}`;
			console.log('---Данные запроса фонового изображения---');
			console.log('cloud,islands,outdoor,palms');
		} else {
			query = `${this.url}?orientation=${this.orientation}&query=night,cloud,nature,moon&per_page=1&client_id=${this.accesKey}`;
			console.log('---Данные запроса фонового изображения---');
			console.log('night,cloud,nature,moon');
		}
		if (!search) {
			query = `${query}&collections=${this.collectionsID}`;
		} else {
			query = `${query}&query=${search}`;
		}
		const response = await fetch(query);
		if (!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		return data.urls.regular;
	},
};


export default backgroundAPI;
