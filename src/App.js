import React from 'react';
import './App.css';

const PLACES = [
  { name: "Moscow", zip: "Moscow,RU" },
  { name: "Helsinki", zip: "helsinki,fi" },
  { name: "Mikkeli", zip: "mikkeli,fi" },
  { name: "Oulu", zip: "oulu,fi" }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      
      <div className="App">
        <nav class="one">
          <ul>
            <li class="myname"> Current Weather App </li>
            <li><a href="https://openweathermap.org/">Origin</a></li>
            <li><a href="#win1">About</a></li>
            <li><a href="#win2">Contact</a></li>
          </ul>
        </nav>

        {/* Overlay windows */}
        <a href="#x" class="overlay" id="win1"></a>
        <div class="popup">
          Test app with current weather.<br /><br />
          I did not want to reistall some software, so I used my own hand-written CSS.<br />
          Actually, this is my first app on JS and React, so it is awful i-i<br /><br />
          I used API here. Check "Origin".
        <a class="close"title="Close" href="#close"></a>
        </div>
        <a href="#x" class="overlay" id="win2"></a>
        <div class="popup">
          Denis Kuivalainen. XAMK student. <a href="kuyvalaynen@gmail.com">kuyvalaynen@gmail.com</a>
        <a class="close"title="Close" href="#close"></a>
        </div>

        <div class="content">
          <div class="content1">
        {PLACES.map((place, index) => (
          <button class="buttons"
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
              {place.name}
          </button>
        ))}
        </div>
        <div class="content2">
        <WeatherDisplay
          key={activePlace}
          zip={PLACES[activePlace].zip}
        />
        </div>
        </div>
      </div>
    );
  }
}

class WeatherDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading...</div>;
    // return <div>{JSON.stringify(weatherData)}</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
       <h1>
         {weather.main} in {weatherData.name}
         <img src={iconUrl} alt={weatherData.description} />
       </h1>
       <p>Current: {((weatherData.main.temp-32)*5/9).toFixed(2)} C°</p>
        <p>High: {((weatherData.main.temp_max-32)*5/9).toFixed(2)} C°</p>
       <p>Low: {((weatherData.main.temp_min-32)*5/9).toFixed(2)} C°</p>
        <p>Wind Speed: {(weatherData.wind.speed/2.237).toFixed(1)} m/s</p>
     </div>
    );
    
  }
}

export default App;
