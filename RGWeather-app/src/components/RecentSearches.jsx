import React from "react";
import WeatherBox from "./WeatherBox";

function RecentSearches({ recentWeathers = [], isCelsius, onCitySelect }) {
  function loadsearches() {
    const storedSearchString = localStorage.getItem("recentsearches");
    return storedSearchString ? JSON.parse(storedSearchString) : [];
  }

  // Get last 2 searches from localStorage
  const recentSearches = loadsearches().slice(-2);

  return (
    <>
      <h2>Recent Searches</h2>
      <div className="recent-searches-container flex gap-4 justify-center mt-4 scale-80">
        {recentWeathers.map((weatherData, index) => (
          <WeatherBox
            key={index}
            weatherData={weatherData}
            isCelsius={isCelsius}
            onExpand={() => onCitySelect?.(weatherData.name)}
          />
        ))}
      </div>
    </>
  );
}

export default RecentSearches;
