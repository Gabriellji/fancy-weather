import config from '../config/geolocationAPIConfig';

const IPinfo = require('node-ipinfo');

const geolocationAPI = {
	...config,

	async loadLocation(placeName, debug = false) {
		const token = this.accesKey;
		const ip = '8.8.8.8';
		const asn = 'AS7922';
		const ipinfo = new IPinfo(token);
	// 	let query = `${this.geolocationUrl}`;
	// 	if (!debug) {
	// 		query = `${query}?q=${placeName}&key=${this.accesKey}`;
	// 	} else {
	// 		query = `${query}?${debug}`;
	// 	}
	// 	const response = await fetch(query);
	// 	if (!response.ok) {
	// 		throw new Error(response.status);
	// 	}
	// 	const data = await response.json();
	// 	return data;
    // },
    ipinfoWrapper.lookupIp(ip).then((response: IPinfo) => {
        console.log(response.asn); // { asn: 'AS15169', name: 'Google LLC', domain: 'google.com', route: '8.8.8.0/24', type: 'hosting' }
        console.log(response.hostname); // google-public-dns-a.google.com
        console.log(response.city); // Mountain View
    });
    
    ipinfoWrapper.lookupASN(asn).then((response: ASNResponse) => {
        console.log(response.asn); // AS7922
        console.log(response.name); // Comcast Cable Communications, LLC
        console.log(response.country); // United States
    });
},

}


export default geolocationAPI;
