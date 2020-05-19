import config from '../config/backgroundAPIConfig';

const backgroundAPI = {
    url: config.url,
    accesKey: config.accesKey,
    collectionID: config.collectionID,
    orientation: config.orientation,


    async loadBgImage() {
        const query = `${this.url}?collections=${this.collectionID}&orientation=${this.orientation}?client_id=${this.accesKey}`;
        const response = await fetch(query);
        const data = await response.json();
        return data.urls.regular;
    },
}


export default backgroundAPI;