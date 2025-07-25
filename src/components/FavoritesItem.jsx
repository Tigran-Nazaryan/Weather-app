import FavoriteToggleButton from "./FavoriteToggleButton.jsx";
import React from "react";
import {useUnit} from "../store/UnitContext.jsx";

function FavoritesItem({item, onSelect}) {
  const {unit} = useUnit();
  return (
    <div
      onClick={() => onSelect(item.city)}
      className="cursor-pointer border p-4 rounded shadow w-full max-w-md hover:bg-gray-100 transition"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{item.city}</h2>
          <p>{item.description}</p>
          <p>
            {item.temp.toFixed(1)} {unit === "metric" ? "°C" : "°F"}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
          alt={item.description}
          className="w-16 h-16"
        />
        <FavoriteToggleButton city={item.city}/>
      </div>
    </div>
  );
}

export default React.memo(FavoritesItem);
