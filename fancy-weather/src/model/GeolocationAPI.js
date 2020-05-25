
const geolocationAPI = {

	async loadLocation(debug = false) {
		if (!navigator.geolocation) {
			throw new Error('geolocation not supported');
		} else {
			try {
				return await this.getPosition();
			} catch (err) {
				return err;
			}
		}
	},

	getPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => resolve(position),
				(error) => reject(error),
			);
		});
	},
};


export default geolocationAPI;
