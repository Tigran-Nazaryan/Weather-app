import {useState, useEffect, useMemo, useCallback} from "react";
import {getCurrentWeather} from "../api/weatherApi.js";
import {useUnit} from "../store/UnitContext.jsx";
import {useCity} from "../store/CityContext.jsx";
import SearchBar from "../components/SearchBar.jsx";
import WeatherDisplay from "../components/WeatherDisplay.jsx";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {unit} = useUnit();
  const {city, setCity} = useCity();
  const [searchQuery, setSearchQuery] = useState(city);

  const normalizedCity = useMemo(() => {
    return weather?.city?.trim().toLowerCase() || "";
  }, [weather]);

  const handleChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      setCity(searchQuery.trim());
    }
  }, [searchQuery, setCity]);


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrentWeather({city, units: unit});
        setWeather((prev) => {
          const newWeather = {
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            city: data.name,
          };
          if (JSON.stringify(prev) !== JSON.stringify(newWeather)) {
            return newWeather;
          }
          return prev;
        });
      } catch (err) {
        setError("Error loading weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit]);

  useEffect(() => {
    setSearchQuery(city);
  }, [city]);

  if (error) return <div className="container text-red-500">{error}</div>;

  return (
    <div className="container flex flex-col pt-4 items-center">
      <div className="flex flex-col items-center gap-3">
        <SearchBar
          searchQuery={searchQuery}
          onChange={handleChange}
          onSearch={handleSearch}
        />

        {loading ? (
          <div className="flex justify-center items-center text-blue-600 font-semibold space-x-1">
            <span>Loading</span>
            <span className="animate-pulse">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-300">.</span>
          </div>
        ) : (
          weather && <WeatherDisplay weather={weather} />
        )}
      </div>
    </div>
  );
};

export default Home;
