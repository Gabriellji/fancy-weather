const stateHelper = {
	getWeekDay(day, local) {
		const configPath = `../config/i18n/${local}/weekdays.js`;
		const weekdays = require(configPath);
		const weekdayNumber = day.getDay();
		return weekdays[weekdayNumber];
	},

	getDateTime(dateString) {
		const dateArr = dateString.split(' ');
		const time = dateArr[1];
		const finalDate = new Date(dateString);
		return `${finalDate.toDateString()} ${time}`;
	},
};

export default stateHelper;
