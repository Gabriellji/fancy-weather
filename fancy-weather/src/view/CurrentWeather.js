import Widget from './Widget';
class CurrentWeather extends Widget {
	constructor() {
		super();

		this.data = new Date();

		this.path = [
			'weatherToday',
			'i18n',
			'i18n.weatherToday',
			'i18n.default',
		];


		this.weatherPanel = document.querySelector('.weather-main');
		this.weatherWrapper = document.querySelector('.main-wrapper');
		this.weatherData = document.querySelector('.weather-data');
	}

	draw() {
		if (this.isStateReady()) {
			this.weatherData.innerHTML = '';
			const weather = this.stateGetterAdapter.getMainWeather();
			this.weatherMain(weather);
			this.weatherCondition(weather);
		}
	}

	initDataTime(weather) {
		const dateTime = document.createElement('p');
		dateTime.classList.add('weather-data__date-time');

		setInterval(() => {
			this.date = new Date();
			const time = this.state.getter('control.lang') === 'en'
				? this.date.toLocaleTimeString('en', { timeZone: weather.tz_id })
				: this.date.toLocaleTimeString('ru', {
					timeZone: weather.tz_id,
				});
			dateTime.textContent = `${weather.dataTime} ${time}`;
		}, 1000);
		return dateTime;
	}


	weatherMain(weather) {
		const location = document.createElement('p');
		location.classList.add('weather-data__location');
		location.textContent = weather.place;

		const dateTime = this.initDataTime(weather);

		const temperatureToday = document.createElement('p');
		temperatureToday.classList.add('weather-data__temperature-today');
		temperatureToday.textContent = weather.temp;

		const cels = document.createElement('span');
		cels.classList.add('cels');
		cels.textContent = '°';

		temperatureToday.appendChild(cels);

		const icon = document.createElement('img');
		icon.classList.add('weather-data__weather-icon');
		icon.setAttribute('src', weather.iconUrl);
		icon.setAttribute('alt', 'weather');

		this.weatherData.appendChild(location);
		this.weatherData.appendChild(dateTime);
		this.weatherData.appendChild(temperatureToday);
		this.weatherData.appendChild(icon);
	}

	weatherCondition(weather) {
		const weatherCondition = document.createElement('div');
		weatherCondition.classList.add('weather-data__weather-data');

		const condition = document.createElement('p');
		condition.classList.add('condition');
		condition.textContent = weather.condition;

		const feelsLike = document.createElement('p');
		feelsLike.classList.add('feels-like');
		feelsLike.textContent = `${weather.i18n.feelsLike} : ${weather.feelsLike}`;

		const wind = document.createElement('p');
		wind.classList.add('wind');
		wind.textContent = `${weather.i18n.wind} : ${weather.wind}`;

		const humidity = document.createElement('p');
		humidity.classList.add('humidity');
		humidity.textContent = `${weather.i18n.humidity} : ${weather.humidity}`;

		weatherCondition.appendChild(condition);
		weatherCondition.appendChild(feelsLike);
		weatherCondition.appendChild(wind);
		weatherCondition.appendChild(humidity);

		this.weatherData.appendChild(weatherCondition);
	}
}

export default CurrentWeather;
