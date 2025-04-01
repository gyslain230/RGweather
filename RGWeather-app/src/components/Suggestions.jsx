import { useEffect } from "react";
import citylist from "../city.list.json";
import WeatherBox from "./WeatherBox";

function Random({ onCitiesSelected, citiesWeather, isCelsius }) {
  // Get 6 random city names from JSON on mount
  useEffect(() => {
    const getRandomCities = () => {
      const shuffled = [...citylist].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 6).map((city) => city.name);
    };

    onCitiesSelected(getRandomCities());
  }, [onCitiesSelected]);

  return (
    <div className="mt-8 px-4">
      <h2 className="text-2xl text-white mb-4 text-center">
        Discover Random Cities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {citiesWeather.map((weatherData, index) => (
          <WeatherBox
            key={`${weatherData.id}-${index}`}
            weatherData={weatherData}
            isCelsius={isCelsius}
            onExpand={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default Random;
