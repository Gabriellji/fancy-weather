import eventMixin from '../mixins/eventMixin';

const state = {
	store: {
		main: {
			bgUrl: '',
			i18n: {
				title: '',
				description: '',
			},

		},
		control: {
			langOptions: [],
			lang: '',
			tempScale: '',
			searchValue: '',
			i18n: {
				searchPlaceholder: '',
				searchBtnTxt: '',
			},

		},
		weatherToday: {
			place: '',
			dataTime: '',
			value: '',
			description: '',
			iconUrl: '',
			i18n: {
				feelsLike: '',
				wind: '',
				humidity: '',
			},

		},
		wearherThreeDays: [
			{
				weekDay: '',
				value: '',
				iconUrl: '',
			},
			{
				weekDay: '',
				value: '',
				iconUrl: '',
			},
			{
				weekDay: '',
				value: '',
				iconUrl: '',
			},
		],
		map: {
			lat: '',
			long: '',
			i18n: {
				latitude: '',
				longitude: '',
			},
		},
	},

	setter(path, value) {
		const pathArr = path.split('.');
		pathArr.reduce((acc, key, idx, arr) => {
			if (typeof acc[key] !== 'object' || idx === arr.length - 1) {
				acc[key] = value;
			}
			return acc[key];
		}, this.store);

		this.emit('stateUpdated', path);
	},

	getter(path) {
		const pathArr = path.split('.');
		return pathArr.reduce((acc, key) => acc[key], this.store);
	},
};


Object.assign(state, eventMixin);


export default state;
