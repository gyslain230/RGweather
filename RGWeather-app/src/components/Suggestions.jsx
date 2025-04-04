import { useEffect, useState } from "react";
import WeatherBox from "./WeatherBox";

// Import your city.list.json data (adjust path as needed)
import cities from "../data/city.list.json";
import RecentSearches from "./RecentSearches";

const API_KEY = "f6e44c06f297e53dedc2ef34ca50548e";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function Suggestions({ onCitySelect }) {
  const [randomCitiesWeather, setRandomCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRandomCities = () => {
      // Filter cities with valid names and country codes
      const validCities = cities.filter(
        (city) => city.name && city.country && city.coord
      );

      // Shuffle and select 6 unique cities
      return [...validCities].sort(() => 0.5 - Math.random()).slice(0, 6);
    };

    const fetchWeatherData = async () => {
      try {
        const randomCities = getRandomCities();
        const weatherPromises = randomCities.map((city) =>
          fetch(
            `${BASE_URL}?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${API_KEY}`
          ).then((res) => res.json())
        );

        const weatherData = await Promise.all(weatherPromises);
        setRandomCitiesWeather(weatherData.filter((data) => data.cod === 200));
        setLoading(false);
      } catch (err) {
        setError("Failed to load city suggestions");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (loading)
    return <div className="text-center p-4">Loading suggestions...</div>;

  return (
    <>
      <h1 className="mb-4">Suggestions:</h1>
      <div className="suggestions-container mt-8 px-4 grid grid-cols-2 md:grid-cols-1    lg:grid-cols-1   gap-4 justify-items-cente sm:scale-70 md:scale-80 lg:scale-100  transition-transform">
        {/* First row of 3 cities */}

        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {randomCitiesWeather.slice(0, 3).map((weatherData, index) => (
            <div key={index} className="flex-1 min-w-[240px] max-w-[300px]">
              <WeatherBox
                weatherData={weatherData}
                isCelsius={true}
                onExpand={() => onCitySelect?.(weatherData.name)}
              />
            </div>
          ))}
        </div>

        {/* Second row of 3 cities */}
        <div className="flex flex-wrap justify-center gap-4">
          {randomCitiesWeather.slice(3, 6).map((weatherData, index) => (
            <div key={index + 3} className="flex-1 min-w-[240px] max-w-[300px]">
              <WeatherBox
                weatherData={weatherData}
                isCelsius={true}
                onExpand={() => onCitySelect?.(weatherData.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Suggestions;
