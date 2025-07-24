import FavoriteToggleButton from "./FavoriteToggleButton.jsx";
import { useFavorites } from "../store/FavoritesContext.jsx";

export default function FavoritesItem({ item, unit, onSelect }) {
    const { removeFavorite } = useFavorites();

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
            <FavoriteToggleButton isFavorite={true} onToggle={() => removeFavorite(item.city)} />
            </div>
        </div>
    );
}
