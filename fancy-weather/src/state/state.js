import eventMixin from '../mixins/eventMixin';

const state = {
	isReady: false,
	store: {
		i18n: {
			main: {},
			control: {},
			weatherToday: {},
			wearherThreeDays: {},
			wearherFiveDays: {},
			map: {},
		},
		main: {
			bgUrl: '',
			city: '',
			searchingStatus: false,
		},
		control: {
			langOptions: [],
			lang: 'en',
			tempScale: 'C',
			searchValue: '',
			is_day: '',
		},
		errors: [],
		weatherToday: {
			place: '',
			dataTime: '',
			value: '',
			description: '',
			iconUrl: '',
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
		wearherFiveDays: [
			{
				weekDay: '',
				dataTime: '',
				month: '',
				value: '',
				description: '',
			}, {
				weekDay: '',
				dataTime: '',
				month: '',
				value: '',
				description: '',
			}, {
				weekDay: '',
				dataTime: '',
				month: '',
				value: '',
				description: '',
			}, {
				weekDay: '',
				dataTime: '',
				month: '',
				value: '',
				description: '',
			}, {
				weekDay: '',
				dataTime: '',
				month: '',
				value: '',
				description: '',
			},
		],
		map: {
			lat: '',
			long: '',
		},
	},

	errorSetter(err) {
		this.store.errors.push(err);
		this.emit('stateUpdated', 'errors');
	},

	errorGetter() {
		const { errors } = this.store;
		this.store.errors = [];
		return errors;
	},

	setter(path, value) {
		if (path === '') {
			this.store = value;
			return;
		}
		const pathArr = path.split('.');
		pathArr.reduce((acc, key, idx, arr) => {
			if (typeof acc[key] !== 'object' || idx === arr.length - 1) {
				acc[key] = value;
			}
			return acc[key];
		}, this.store);


		if (this.isReady) {
			this.emit('stateUpdated', path);
		}
	},

	getter(path) {
		if (path === '') {
			return this.store;
		}
		const pathArr = path.split('.');
		return pathArr.reduce((acc, key) => acc[key], this.store);
	},

	ready() {
		this.isReady = true;
		this.emit('stateReady');
	},
};


Object.assign(state, eventMixin);


export default state;
