import { useState } from "react";
import "./App.css";
import CurrentWeather from "./Components/current-weather/CurrentWeather";
import Search from "./Components/search/Search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Forecast from "./Components/forecast/Forecast";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const hangleOnSearchChange = (searchData) => {
    // console.log(searchData) //handle search data here
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecashFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecashFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">

      <h1 className="app-title">
        <img src="icons/01d.png" alt="" />
        <span> Suncity Weather Forcast</span>
      </h1>

      <Search onSearchChange={hangleOnSearchChange} />

      {currentWeather && <CurrentWeather data={currentWeather} />}

      {forecast && <Forecast data={forecast} />}

     
    </div>
  );
}

export default App;
