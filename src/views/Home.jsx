import {useState, useEffect, useMemo} from "react";
import {getCurrentWeather} from "../api/weatherApi.js";
import {useUnit} from "../store/UnitContext.jsx";
import {useCity} from "../store/CityContext.jsx";
import {useFavorites} from "../store/FavoritesContext.jsx";
import SearchBar from "../components/SearchBar.jsx";
import WeatherDisplay from "../components/WeatherDisplay.jsx";

const Home = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {unit} = useUnit();
    const {city, setCity} = useCity();
    const [searchQuery, setSearchQuery] = useState(city);
    const {favorites, addFavorite, removeFavorite} = useFavorites();

    const isFavorite = useMemo(() => {
        if (!weather) return false;
        const normalizedCity = weather.city.trim().toLowerCase();
        return favorites.some(fav => fav.trim().toLowerCase() === normalizedCity);
    }, [favorites, weather]);

    const handleChange = (e) => setSearchQuery(e.target.value);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setCity(searchQuery.trim());
        }
    };

    const toggleFavorite = () => {
        if (!weather) return;

        const normalizedCity = weather.city.trim().toLowerCase();
        const isAlreadyFavorite = favorites.some(
            fav => fav.trim().toLowerCase() === normalizedCity
        );

        if (isAlreadyFavorite) {
            removeFavorite(weather.city);
        } else {
            addFavorite(weather.city);
        }
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getCurrentWeather({city, units: unit});
                setWeather({
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    city: data.name,
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

    if (loading)
        return (
            <div className="flex justify-center h-35 items-center text-blue-600 font-semibold space-x-1">
                <span>Loading</span>
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
            </div>
        );

    if (error) return <div className="container text-red-500">{error}</div>;

    return (
        <div className="container flex flex-col pt-4 items-center">
            <div className="flex flex-col items-center gap-3">
                <SearchBar
                    searchQuery={searchQuery}
                    onChange={handleChange}
                    onSearch={handleSearch}
                />

                {weather && (
                    <WeatherDisplay
                        weather={weather}
                        isFavorite={isFavorite}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
