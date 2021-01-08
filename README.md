![Javascript](https://aleen42.github.io/badges/src/javascript.svg)
![Webpack](https://aleen42.github.io/badges/src/webpack.svg)
![ESlint](https://aleen42.github.io/badges/src/eslint.svg)
# Fancy weather App 
A weather forecast app with voice control and geolocation info. Only used pure vanilla JavaScript without any frameworks involved.
### Downloading
`git clone {repository URL}`
### Installing NPM modules
`npm install`
### Running application
Add your Api keys to `src/config/.. .js.example` and rename files to `name-of-your-config.js`

`cd fancy-weather`

`npm run dev`
### Description of the task ([RSSchool](https://rs.school))
https://github.com/rolling-scopes-school/tasks/blob/master/tasks/fancy-weather.md

### Application structure
The application contains four functional blocks.
- Control panel
- Weather for today
- Three days weather forecast
- Geolocation data

### Demo

 https://gabriellji-fancy-weather.netlify.app

![demo](https://i.imgur.com/Bos9L7w.png)

### Technology
- Background img API: [Unsplash](https://unsplash.com)
- Geocoding Api: [OpenCage Geocoding API](https://opencagedata.com)
- Geolocation Api: [ipinfo.io](https://ipinfo.io)
- Map Api: [Mapbox](https://www.mapbox.com)
- Weather Api: [weatherapi.com](https://www.weatherapi.com)

### Description
* When the user opens the app, all data on the page is relative to the user's current location 
* The search bar searches for the city / country
* The background image changes when the page content is refreshed or when you click on the button to switch the background image in the control unit
* Weather for today
* Three days weather forecast
* Geolocation data
* Voice control (search by name of country / city)