class ForecastWeather {
	constructor() {
		this.weatherPanel = document.querySelector('.weather-main');
		this.weatherWrapper = document.querySelector('.main-wrapper');
		this.weatherData = document.querySelector('.weather-data');
	}

	createForecastPanel() {
		const forecastBox = document.createElement('div');
		forecastBox.classList.add('forecast', 'first');

		const weekDay = document.createElement('p');
		weekDay.classList.add('forecast__day');
		const temperature = document.createElement('p');
		temperature.classList.add('forecast__temperature');
		const forecastIcon = document.createElement('img');
		forecastIcon.classList.add('forecast__icon');
		forecastIcon.setAttribute('src');
		forecastIcon.setAttribute('alt');

		forecastBox.appendChild(weekDay);
		forecastBox.appendChild(temperature);
		forecastBox.appendChild(forecastIcon);

		const forecastBoxSecond = document.createElement('div');
		forecastBoxSecond.classList.add('forecast', 'second');

		const weekDaySecond = document.createElement('p');
		weekDaySecond.classList.add('forecast__day');
		const temperatureSecond = document.createElement('p');
		temperatureSecond.classList.add('forecast__temperature');
		const forecastIconSecond = document.createElement('img');
		forecastIconSecond.classList.add('forecast__icon');
		forecastIconSecond.setAttribute('src');
		forecastIconSecond.setAttribute('alt');

		forecastBoxSecond.appendChild(weekDaySecond);
		forecastBoxSecond.appendChild(temperatureSecond);
		forecastBoxSecond.appendChild(forecastIconSecond);

		const forecastBoxThird = document.createElement('div');
		forecastBoxThird.classList.add('forecast', 'third');

		const weekDayThird = document.createElement('p');
		weekDayThird.classList.add('forecast__day');
		const temperatureThird = document.createElement('p');
		temperatureThird.classList.add('forecast__temperature');
		const forecastIconThird = document.createElement('img');
		forecastIconThird.classList.add('forecast__icon');
		forecastIconThird.setAttribute('src');
		forecastIconThird.setAttribute('alt');

		forecastBoxThird.appendChild(weekDayThird);
		forecastBoxThird.appendChild(temperatureThird);
		forecastBoxThird.appendChild(forecastIconThird);

		this.weatherData.appendChild(forecastBox);
		this.weatherData.appendChild(forecastBoxSecond);
		this.weatherData.appendChild(forecastBoxThird);
	}
}

export default ForecastWeather;
