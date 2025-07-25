import {FaHeart, FaRegHeart} from "react-icons/fa";
import React, {useCallback} from "react";
import {useFavorites} from "../store/FavoritesContext.jsx";

function FavoriteToggleButton({city}) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(city);

  const toggleFavorite = useCallback(() => {
    if (favorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  }, [favorite, city, addFavorite, removeFavorite]);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleFavorite();
  };


  return (
    <button
      onClick={handleClick}
      className="focus:outline-none cursor-pointer"
    >
      {favorite ? (
        <FaHeart className="text-red-500"/>
      ) : (
        <FaRegHeart className="text-gray-500"/>
      )}
    </button>
  );
}

export default React.memo(FavoriteToggleButton);
