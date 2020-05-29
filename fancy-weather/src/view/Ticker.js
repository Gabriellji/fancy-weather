import Widget from './Widget';

class Ticker extends Widget {
	constructor() {
		super();

		this.tickerWrapper = document.querySelector('.ticker-wrapper');
	}

	draw(path) {
		if (this.isStateReady()) {
			this.tickerWrapper.innerHTML = '';
			const weather = this.stateGetterAdapter.getFiveDaysForecast();
			this.createTickerPanel(weather);
		}
	}

	createTickerPanel(weather) {
		const tickerBox = document.createElement('div');
		const descrip = Object.keys(weather.i18n);
		tickerBox.classList.add('ticker');

		weather.weather.forEach((day) => {
			let newItem = document.createElement('p');
			newItem.classList.add('ticker__item');
			newItem.textContent = `${day.month} ${day.date}, ${day.weekDay}`;
			tickerBox.appendChild(newItem);

			descrip.forEach((desc) => {
				const tickerItem = document.createElement('p');
				tickerItem.classList.add('ticker__item');
				tickerItem.textContent = `${weather.i18n[desc]}: ${day[desc]}`;
				tickerBox.appendChild(tickerItem);
			});

			newItem = document.createElement('p');
			newItem.classList.add('ticker__item');
			newItem.textContent = '||';
			const img = document.createElement('img');
			img.setAttribute('src', '/assets/sun(1).svg');
			newItem.appendChild(img);
			tickerBox.appendChild(newItem);
		});

		this.tickerWrapper.appendChild(tickerBox);
	}
}

export default Ticker;
