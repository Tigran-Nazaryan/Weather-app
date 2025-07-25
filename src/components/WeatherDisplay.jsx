import TemperatureSwitcher from "./TemperatureSwitcher.jsx";
import FavoriteToggleButton from "./FavoriteToggleButton.jsx";
import React from "react";

function WeatherDisplay({weather}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Weather in {weather.city}
        </h1>
        <FavoriteToggleButton city={weather.city}/>
      </div>
      <TemperatureSwitcher temp={weather.temp}/>
      <p>Description: {weather.description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
      />
    </>
  );
}

export default React.memo(WeatherDisplay);