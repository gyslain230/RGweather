// WeatherCard.jsx (Child Component)
import ForecastItem from "./Forecast";
function WeatherCard({
  weatherData,
  forecastData,
  isCelsius,
  toggleTemperatureUnit,
  onCollapse,
}) {
  const convertTemp = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };
  // Process forecast data to get daily forecasts
  const processForecast = () => {
    if (!forecastData) return [];

    const dailyForecasts = [];
    const seenDays = new Set();

    forecastData.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!seenDays.has(date) && dailyForecasts.length < 5) {
        seenDays.add(date);
        dailyForecasts.push(forecast);
      }
    });

    return dailyForecasts;
  };

  return (
    <div className="weather-card mt-4 p-6 bg-slate-700  opacity-80  rounded-3xl shadow-lg backdrop-blur-sm max-w-2xl mx-auto sm:mt-35 ">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <button
          onClick={onCollapse} // This now handles collapsing
          className="bg-slate-500 px-4 py-2 rounded-lg hover:bg-slate-400 transition-colors text-white"
        >
          Close
        </button>
        <button
          onClick={toggleTemperatureUnit}
          className="bg-slate-500 px-4 py-2 rounded-lg hover:bg-slate-400 transition-colors text-white"
        >
          Switch to {isCelsius ? "°F" : "°C"}
        </button>
      </div>

      <div className="weather-info grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="main-info text-center">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={weatherData.weather[0].description}
            className="w-32 h-32 mx-auto"
          />
          <p className="temperature text-5xl font-bold text-white my-4">
            {Math.round(convertTemp(weatherData.main.temp))}°
            {isCelsius ? "C" : "F"}
          </p>
          <p className="description text-xl text-white capitalize">
            {weatherData.weather[0].description}
          </p>
        </div>

        <div className="additional-info bg-slate-600/30 p-6 rounded-xl">
          <div className="grid grid-cols-2 gap-4 text-white">
            <div className="info-item">
              <p className="font-semibold">Feels Like</p>
              <p>{Math.round(convertTemp(weatherData.main.feels_like))}°</p>
            </div>
            <div className="info-item">
              <p className="font-semibold">Humidity</p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="info-item">
              <p className="font-semibold">Wind Speed</p>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="info-item">
              <p className="font-semibold">Pressure</p>
              <p>{weatherData.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          5-Day Forecast
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {processForecast().map((forecast, index) => (
            <ForecastItem
              key={index}
              forecast={forecast}
              isCelsius={isCelsius}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
