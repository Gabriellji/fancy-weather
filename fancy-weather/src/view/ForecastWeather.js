class ForecastWeather {
	constructor() {
		this.weatherPanel = document.querySelector('.weather-main');
		this.weatherWrapper = document.querySelector('.main-wrapper');
		this.weatherData = document.querySelector('.weather-data');
	}

	createForecastPanel(day, temp, icon) {
		let div;
		let days;
		let temperature;
		let img;
		for (let i = 0; i <= 3; i += 1) {
			div = document.createElement('div');
			div.classList.add('forecast');
			days = document.createElement('p');
			days.classList.add('forecast__day');
			days.textContent = day;
			temperature = document.createElement('p');
			temperature.classList.add('forecast__temperature');
			temperature.textContent = temp;
			img = document.createElement('img');
			img.classList.add('forecast__icon');
			img.setAttribute('src', icon);
			img.setAttribute('alt', 'weather');
			div.appendChild(days);
			div.appendChild(temperature);
			div.appendChild(img);
			this.weatherData.appendChild(div);
		}
	}
}

export default ForecastWeather;


// const forecastBox = document.createElement('div');
// forecastBox.classList.add('forecast', 'first');

// const weekDay = document.createElement('p');
// weekDay.classList.add('forecast__day');
// const temperature = document.createElement('p');
// temperature.classList.add('forecast__temperature');
// const forecastIcon = document.createElement('img');
// forecastIcon.classList.add('forecast__icon');
// forecastIcon.setAttribute('src');
// forecastIcon.setAttribute('alt');

// forecastBox.appendChild(weekDay);
// forecastBox.appendChild(temperature);
// forecastBox.appendChild(forecastIcon);

// const forecastBoxSecond = document.createElement('div');
// forecastBoxSecond.classList.add('forecast', 'second');

// const weekDaySecond = document.createElement('p');
// weekDaySecond.classList.add('forecast__day');
// const temperatureSecond = document.createElement('p');
// temperatureSecond.classList.add('forecast__temperature');
// const forecastIconSecond = document.createElement('img');
// forecastIconSecond.classList.add('forecast__icon');
// forecastIconSecond.setAttribute('src');
// forecastIconSecond.setAttribute('alt');

// forecastBoxSecond.appendChild(weekDaySecond);
// forecastBoxSecond.appendChild(temperatureSecond);
// forecastBoxSecond.appendChild(forecastIconSecond);

// const forecastBoxThird = document.createElement('div');
// forecastBoxThird.classList.add('forecast', 'third');

// const weekDayThird = document.createElement('p');
// weekDayThird.classList.add('forecast__day');
// const temperatureThird = document.createElement('p');
// temperatureThird.classList.add('forecast__temperature');
// const forecastIconThird = document.createElement('img');
// forecastIconThird.classList.add('forecast__icon');
// forecastIconThird.setAttribute('src');
// forecastIconThird.setAttribute('alt');

// forecastBoxThird.appendChild(weekDayThird);
// forecastBoxThird.appendChild(temperatureThird);
// forecastBoxThird.appendChild(forecastIconThird);

// this.weatherData.appendChild(forecastBox);
// this.weatherData.appendChild(forecastBoxSecond);
// this.weatherData.appendChild(forecastBoxThird);
