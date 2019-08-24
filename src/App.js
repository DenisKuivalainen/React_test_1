import React from 'react';
import logo from './logo.svg';
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
        {PLACES.map((place, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
              {place.name}
          </button>
        ))}
        <WeatherDisplay
          key={activePlace}
          zip={PLACES[activePlace].zip}
        />
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
