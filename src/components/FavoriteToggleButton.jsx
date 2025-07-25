import {FaHeart, FaRegHeart} from "react-icons/fa";
import React from "react";

function FavoriteToggleButton({isFavorite, onToggle}) {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="focus:outline-none cursor-pointer"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <FaHeart className="text-red-500"/>
      ) : (
        <FaRegHeart className="text-gray-500"/>
      )}
    </button>
  );
}

export default React.memo(FavoriteToggleButton);
