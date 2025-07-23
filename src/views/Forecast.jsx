import {useEffect, useState} from "react";
import {get5DayForecast} from "../api/weatherApi";

const Forecast = () => {
    const [forecast, setForecast] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const data = await get5DayForecast({city: "Moscow"});
                setForecast(data.list);
            } catch (err) {
                console.error(err);
                setError("Error loading weather");
            }
        }

        fetchWeather();
    }, []);

    if (error) return <div className="text-red-500">{error}</div>;

    const groupedByDate = forecast.reduce((acc, item) => {
        const date = item.dt_txt.slice(0, 10);
        acc[date] = acc[date] || [];
        acc[date].push(item);
        return acc;
    }, {});


    const timesForSelectedDate = selectedDate ? groupedByDate[selectedDate] : [];

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}.${month}`;
    };

    const formatTime = (dt_txt) => dt_txt.split(" ")[1].slice(0, 5);

    return (
        <div className="container flex flex-col items-center pt-4">
            <h1 className="text-2xl font-bold mb-6">5-Day Forecast</h1>

            <div className="grid grid-cols-6 gap-3 mb-6">
                {Object.keys(groupedByDate).map((date) => (
                    <button
                        key={date}
                        onClick={() => {
                            setSelectedDate(date);
                            setSelectedTime(null);
                        }}
                        className={`px-4 py-2 rounded border ${
                            selectedDate === date
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-800 border-gray-300"
                        }`}
                    >
                        {formatDate(date)}
                    </button>
                ))}
            </div>

            {selectedDate && (
                <div className="grid grid-cols-8 items-center gap-3 mb-6">
                    {timesForSelectedDate.map((item) => (
                        <button
                            key={item.dt}
                            onClick={() => setSelectedTime(item)}
                            className={`px-3 py-1 rounded border text-sm ${
                                selectedTime?.dt === item.dt
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-gray-800 border-gray-300"
                            }`}
                        >
                            {formatTime(item.dt_txt)}
                        </button>
                    ))}
                </div>
            )}

            {selectedTime && (
                <div className="p-6 border rounded shadow max-w-md bg-white">
                    <h2 className="text-xl font-semibold mb-2">
                        Weather on {formatDate(selectedTime.dt_txt.split(" ")[0])} at{" "}
                        {formatTime(selectedTime.dt_txt)}
                    </h2>
                    <p>Temperature: {selectedTime.main.temp}°C</p>
                    <p>Feels like: {selectedTime.main.feels_like}°C</p>
                    <p>Humidity: {selectedTime.main.humidity}%</p>
                    <p>Wind: {selectedTime.wind.speed} m/s</p>
                    <p>Description: {selectedTime.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Forecast;
