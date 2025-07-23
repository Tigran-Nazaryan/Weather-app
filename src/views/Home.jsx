import {useEffect, useState} from "react";
import {getCurrentWeather} from "../api/weatherApi.js";
import {useUnit} from "../store/UnitContext.jsx";

const Home = () => {
    const city = "Erevan"
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {unit, toggleUnit} = useUnit();

    useEffect(() => {
        async function fetchWeather() {
            try {
                const data = await getCurrentWeather({city, units: unit});
                console.log(data);
                setWeather({
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    city: data.name
                });
            } catch (error) {
                setError("Error loading weather");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [city, unit])

    if (loading) return (
        <div className="flex justify-center items-center h-24 text-blue-600 font-semibold space-x-1">
            <span>Loading</span>
            <span className="animate-pulse">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-300">.</span>
        </div>
    );

    if (error) return <div className="container text-red-500">{error}</div>;

    return (
        <div className="container flex flex-col items-center pt-4">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-2xl font-bold">Weather in {weather.city}</h1>
                <div>
                    <p>
                        Temp: {weather.temp.toFixed(1)} {unit === "metric" ? "°C" : "°F"}
                    </p>
                    <button
                        onClick={toggleUnit}
                        className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                        Switch to {unit === "metric" ? "°F" : "°C"}
                    </button>
                </div>
                <p>Description: {weather.description}</p>
                <div>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.description}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;