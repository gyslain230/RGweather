function ForecastItem({ forecast, isCelsius }) {
  const convertTemp = (temp) => (isCelsius ? temp : (temp * 9) / 5 + 32);
  const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="forecast-item bg-slate-600 p-3 rounded-lg text-center">
      <div className="text-sm font-medium">{date}</div>
      <img
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
        alt={forecast.weather[0].description}
        className="mx-auto my-1 w-12 h-12"
      />
      <div className="text-sm">
        {Math.round(convertTemp(forecast.main.temp))}°{isCelsius ? "C" : "F"}
      </div>
      <div className="text-xs text-slate-300">{forecast.weather[0].main}</div>
    </div>
  );
}

export default ForecastItem;
