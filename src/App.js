import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <WeatherDisplay zip={"12345"} />
      </div>
  );
}

function WeatherDisplay () {
  return (
    <h1>Displaying some Weather!</h1>
  );
}

export default App;
