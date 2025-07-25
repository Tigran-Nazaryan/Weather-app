import React from "react";
import {useUnit} from "../store/UnitContext.jsx";

const TemperatureSwitcher = ({temp}) => {
  const {unit, toggleUnit} = useUnit();
  return (
    <div>
      <p>
        Temp: {temp.toFixed(1)} {unit === "metric" ? "°C" : "°F"}
      </p>
      <button
        onClick={toggleUnit}
        className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
      >
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>
    </div>
  );
};

export default React.memo(TemperatureSwitcher);
