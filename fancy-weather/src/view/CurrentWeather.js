class CurrentWeather {
	constructor() {
		this.weatherPanel = document.querySelector('.weather-main');
		this.weatherWrapper = document.querySelector('.main-wrapper');
		this.weatherData = document.querySelector('.weather-data');
	}

	createCurrentWeatherPanel() {
		this.weatherData();
		this.weatherCondition();
	}

	weatherData(locat, time, temp, img) {
		const location = document.createElement('p');
		location.classList.add('weather-data__location');
		location.textContent = locat;

		const dateTime = document.createElement('p');
		dateTime.classList.add('weather-data__location');
		dateTime.textContent = time;

		const temperatureToday = document.createElement('p');
		temperatureToday.classList.add('weather-data__temperature-today');
		temperatureToday.textContent = temp;

		const icon = document.createElement('img');
		icon.classList.add('weather-data__weather-icon');
		icon.setAttribute('src', img);
		icon.setAttribute('alt', 'weather');

		this.weatherData.appendChild(location);
		this.weatherData.appendChild(dateTime);
		this.weatherData.appendChild(temperatureToday);
		this.weatherData.appendChild(icon);
	}

	weatherCondition(describ, feels, windd, humid) {
		const weatherCondition = document.createElement('div');
		weatherCondition.classList.add('weather-data__weather-data');

		const condition = document.createElement('p');
		condition.classList.add('condition');
		condition.textContent = describ;

		const feelsLike = document.createElement('p');
		feelsLike.classList.add('feels-like');
		feelsLike.textContent = feels;

		const wind = document.createElement('p');
		wind.classList.add('wind');
		wind.textContent = windd;

		const humidity = document.createElement('p');
		humidity.classList.add('humidity');
		humidity.textContent = humid;

		weatherCondition.appendChild(condition);
		weatherCondition.appendChild(feelsLike);
		weatherCondition.appendChild(wind);
		weatherCondition.appendChild(humidity);

		this.weatherData.appendChild(weatherCondition);
	}
}

export default CurrentWeather;
