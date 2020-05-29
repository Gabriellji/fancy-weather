import Background from './Background';
import Buttons from './Buttons';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import Ticker from './Ticker';
import Map from './Map';
import Search from './Search-input';

class View {
	constructor() {
		this.background = new Background();
		this.buttons = new Buttons();
		this.currentWeather = new CurrentWeather();
		this.forecastWeather = new ForecastWeather();
		this.ticker = new Ticker();
		this.map = new Map();
		this.search = new Search();
	}
}

export default View;
