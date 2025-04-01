// WeatherBox.jsx (Child Component)
function WeatherBox({
  weatherData,
  isCelsius,
  toggleTemperatureUnit,
  onExpand, // Add this prop
}) {
  if (!weatherData) return null;

  const convertTemp = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <div
      className="weather-box cursor-pointer  opacity-90  p-4 bg-slate-700 rounded-xl shadow-lg backdrop-blur-sm w-48  mx-auto transition-all hover:scale-105"
      onClick={onExpand}
    >
      <div className="grid grid-cols-2 gap-2 text-white whitespace-nowrap">
        <div className="col-span-2">
          <h3 className="text-lg font-bold">
            {weatherData.name}, {weatherData.sys.country}
          </h3>
        </div>
        <div className="flex space-x-3">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={weatherData.weather[0].description}
            className="w-15 h-15 mx-auto "
          />
          <div className="text-4xl font-bold">
            {" "}
            {Math.round(convertTemp(weatherData.main.temp))}°
            {isCelsius ? "C" : "F"}
          </div>
        </div>

        <br />
        <div className="space-y-1">
          <p className="text-sm">💧Humidty:{weatherData.main.humidity}%</p>
          <p className="text-sm">🌬️ Wind speed: {weatherData.wind.speed}m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherBox;
