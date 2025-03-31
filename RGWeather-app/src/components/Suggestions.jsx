import { useState, useEffect } from "react";
// Import your citylist.json file
import citylist from "../city.list.json";
import WeatherBox from "./WeatherBox";

function Random(weatherData) {
  // ... existing state
  const [randomCitiesWeather, setRandomCitiesWeather] = useState([]);

  // Function to get random unique city names
  const getRandomCities = () => {
    const shuffled = [...citylist].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6).map((city) => city.name);
  };

  // Fetch weather for random cities
  const fetchRandomCitiesWeather = async () => {
    const randomCities = getRandomCities();
    const weatherPromises = randomCities.map((city) =>
      fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`)
        .then((res) => res.json())
        .catch(() => null)
    );

    const results = await Promise.all(weatherPromises);
    setRandomCitiesWeather(results.filter((data) => data?.cod === 200));
  };

  // Load random cities on component mount
  useEffect(() => {
    fetchRandomCitiesWeather();
  }, []);

  return (
    <>
      {/* Existing components */}

      <div className="mt-8">
        <h2 className="text-2xl text-white mb-4 text-center">
          Discover Random Cities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {randomCitiesWeather.map((weatherData, index) => (
            <WeatherBox
              key={index}
              weatherData={weatherData}
              isCelsius={isCelsius}
              // Disable expand functionality for these boxes
              onExpand={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default Random;
