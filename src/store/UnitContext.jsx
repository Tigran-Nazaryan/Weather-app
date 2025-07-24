import {createContext, useContext, useState} from "react";

const UnitContext = createContext();

export const UnitProvider = ({children}) => {
    const [unit, setUnit] = useState("metric");

    const toggleUnit = () => {
        setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
    };

    const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
    const toCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

    return (
        <UnitContext.Provider
            value={{unit, toggleUnit, toFahrenheit, toCelsius}}
        >
            {children}
        </UnitContext.Provider>
    );
};

export const useUnit = () => useContext(UnitContext);
