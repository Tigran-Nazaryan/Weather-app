import {useFavorites} from "../store/FavoritesContext.jsx";
import {useCity} from "../store/CityContext.jsx";
import {getCurrentWeather} from "../api/weatherApi";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUnit} from "../store/UnitContext.jsx";
import ROUTES from "../routes/paths.js";
import FavoritesItem from "../components/FavoritesItem.jsx";

const Favorites = () => {
  const {favorites} = useFavorites();
  const {setCity} = useCity();
  const {unit} = useUnit();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchFavoritesWeather = async () => {
      const results = await Promise.all(
        favorites.map(async (city) => {
          try {
            const data = await getCurrentWeather({city, units: unit});
            return {
              id: data.id,
              city: data.name,
              temp: data.main.temp,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            };
          } catch (error) {
            console.error(`Ошибка для города ${city}`, error);
            return null;
          }
        })
      );

      setWeatherData(results.filter(Boolean));
    };

    fetchFavoritesWeather();
  }, [favorites, unit]);

  const handleSelectCity = (cityName) => {
    setCity(cityName);
    navigate(ROUTES.ROOT);
  };

  return (
    <div className="container flex flex-col items-center pt-4 gap-4">
      <h1 className="text-2xl font-bold">Featured city</h1>
      {weatherData.length === 0 ? (
        <p className="text-gray-600">There are no featured cities yet.</p>
      ) : (
        weatherData.map(item => (
            <FavoritesItem
              key={item.id}
              item={item}
              onSelect={handleSelectCity}
            />
          )
        ))}
    </div>
  );
};

export default Favorites;
