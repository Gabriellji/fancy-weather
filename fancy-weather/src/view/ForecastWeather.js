import Widget from './Widget';

class ForecastWeather extends Widget {
	constructor() {
		super();

		this.path = [
			'weatherThreeDays',
			'i18n',
			'i18n.default',
		];

		this.weatherPanel = document.querySelector('.weather-main');
		this.weatherWrapper = document.querySelector('.main-wrapper');
		this.weatherData = document.querySelector('.weather-data');
	}

	draw() {
		if (this.isStateReady()) {
			const weather = this.stateGetterAdapter.getThreeDaysForecast();
			this.createForecastPanel(weather);
		}
	}

	createForecastPanel(weather) {
		let div;
		let days;
		let temperature;
		let img;
		for (let i = 0; i < 3; i += 1) {
			div = document.createElement('div');
			div.classList.add('forecast');

			days = document.createElement('p');
			days.classList.add('forecast__day');
			days.textContent = weather[i].weekDay;

			temperature = document.createElement('p');
			temperature.classList.add('forecast__temperature');
			temperature.textContent = weather[i].temp;

			img = document.createElement('img');
			img.classList.add('forecast__icon');
			img.setAttribute('src', weather[i].iconUrl);
			img.setAttribute('alt', 'weather');

			div.appendChild(days);
			div.appendChild(temperature);
			div.appendChild(img);

			this.weatherData.appendChild(div);
		}
	}
}

export default ForecastWeather;
