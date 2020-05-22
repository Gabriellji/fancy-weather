class CurrentWeather {
	constructor() {
		this.weatherPanel = document.querySelector('.weather-main');
		this.weatherWrapper = document.querySelector('.main-wrapper');
		this.weatherData = document.querySelector('.weather-data');
	}

	createCurrentWeatherPanel() {
		const location = document.createElement('p');
		location.classList.add('weather-data__location');
		const dateTime = document.createElement('p');
		dateTime.classList.add('weather-data__location');
		const temperatureToday = document.createElement('p');
		temperatureToday.classList.add('weather-data__temperature-today');
		const icon = document.createElement('img');
		icon.classList.add('weather-data__weather-icon');
		icon.setAttribute('src');
		icon.setAttribute('alt');

		const weatherCondition = document.createElement('div');
		weatherCondition.classList.add('weather-data__weather-data');
		const condition = document.createElement('p');
		condition.classList.add('condition');
		const feelsLike = document.createElement('p');
		feelsLike.classList.add('feels-like');
		const wind = document.createElement('p');
		wind.classList.add('wind');
		const humidity = document.createElement('p');
		humidity.classList.add('humidity');
		const uv = document.createElement('p');
		uv.classList.add('uv');
		const sunrise = document.createElement('p');
		sunrise.classList.add('sunrise');
		const sunset = document.createElement('p');
		sunset.classList.add('sunset');

		this.weatherData.appendChild(location);
		this.weatherData.appendChild(dateTime);
		this.weatherData.appendChild(temperatureToday);
		this.weatherData.appendChild(icon);

		weatherCondition.appendChild(condition);
		weatherCondition.appendChild(feelsLike);
		weatherCondition.appendChild(wind);
		weatherCondition.appendChild(humidity);
		weatherCondition.appendChild(uv);
		weatherCondition.appendChild(sunrise);
		weatherCondition.appendChild(sunset);

		this.weatherData.appendChild(weatherCondition);
	}
}

export default CurrentWeather;
