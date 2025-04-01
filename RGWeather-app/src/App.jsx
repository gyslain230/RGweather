import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import { useState, useEffect, useCallback } from "react";
import WeatherBox from "./components/WeatherBox";
import Random from "./components/Suggestions";
import LocationDetector from "./components/LocationDetector";

const API_KEY = "f6e44c06f297e53dedc2ef34ca50548e";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  // Add new state for forecast
  const [forecastData, setForecastData] = useState(null);
  const [randomCitiesWeather, setRandomCitiesWeather] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [manualSearchPerformed, setManualSearchPerformed] = useState(false);

  const fetchWeatherData = useCallback(async (cityName) => {
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
  }, []);
  const handleLocationDetected = useCallback(
    async (lat, lon) => {
      if (manualSearchPerformed) return;
      setLoading(true);
      try {
        const reverseResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );
        if (!reverseResponse.ok) throw new Error("Location lookup failed");
        const reverseData = await reverseResponse.json();
        if (reverseData.length === 0) throw new Error("No city found");
        const cityName = reverseData[0].name;
        fetchWeatherData(cityName);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    },
    [fetchWeatherData, manualSearchPerformed]
  );
  const handleLocationError = useCallback((message) => {
    setLocationError(message);
  }, []);

  useEffect(() => {
    const fetchRandomCitiesWeather = async (cityNames) => {
      try {
        const promises = cityNames.map((city) =>
          fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`).then(
            (res) => {
              if (!res.ok) throw new Error("City not found");
              return res.json();
            }
          )
        );

        const results = await Promise.all(promises);
        setRandomCitiesWeather(results.filter((data) => data.cod === 200));
      } catch (error) {
        console.error("Error fetching random cities:", error);
      }
    };
  }, []);
  // function to hadnle searche
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setManualSearchPerformed(true);
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
      <div className="flex -ml-50 m-auto  -mt-90  ">
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
      {!manualSearchPerformed && (
        <LocationDetector
          onLocationDetected={handleLocationDetected}
          onError={handleLocationError}
        />
      )}
      {/* RandomWeather component 
      <Random
        onCitiesSelected={setRandomCitiesWeather}
        citiesWeather={randomCitiesWeather}
        isCelsius={isCelsius}
      />
      */}
    </>
  );
}

export default App;
