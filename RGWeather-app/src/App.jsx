import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import WeatherBox from "./components/WeatherBox";
import Random from "./components/Suggestions";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  // Add new state for forecast
  const [forecastData, setForecastData] = useState(null);

  const API_KEY = "f6e44c06f297e53dedc2ef34ca50548e";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) throw new Error("Forecast data unavailable");
      const forecastData = await forecastResponse.json();

      setWeatherData(data);
      setForecastData(forecastData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  // function to hadnle searche
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };
  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <>
      <div className="flex -ml-50 m-auto  -mt-90   ">
        <img src="/logo.png" alt="weather logo" className=" size-20" />
        <h1 className="mt-4 ">RGWeather</h1>
      </div>

      <div>
        ;
        <SearchBar
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
          loading={loading}
          error={error}
        />
        <div className="container mx-auto p-4">
          {!isExpanded
            ? weatherData && (
                <WeatherBox
                  weatherData={weatherData}
                  isCelsius={isCelsius}
                  onExpand={handleExpand}
                />
              )
            : weatherData && (
                <WeatherCard
                  weatherData={weatherData}
                  forecastData={forecastData}
                  isCelsius={isCelsius}
                  onCollapse={() => setIsExpanded(false)}
                  toggleTemperatureUnit={() => setIsCelsius(!isCelsius)}
                />
              )}
        </div>
        {/* {weatherData && (
          <WeatherCard
            weatherData={weatherData}
            isCelsius={isCelsius}
            toggleTemperatureUnit={toggleTemperatureUnit}
          />
        )}
          */}
      </div>
      <div>
        <Random />
      </div>
    </>
  );
}

export default App;
