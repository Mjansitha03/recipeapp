import React, { useContext } from "react";
import { RecipeContext } from "../Context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipeCard = ({ item }) => {
  const { favorites, toggleFavorite } = useContext(RecipeContext);
  const navigate = useNavigate();
  const isFavorite = favorites.some((fav) => fav.idMeal === item.idMeal);

  const handleCardClick = () => navigate(`/recipe/${item.idMeal}`);

  return (
    <div
      onClick={handleCardClick}
      className="relative group bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.04] transition-all cursor-pointer w-72 overflow-hidden"
    >
      <img
        src={item.strMealThumb}
        alt={item.strMeal}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      {/* Hover overlay for call-to-action */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
        <span className="text-white text-lg font-semibold bg-orange-600 px-4 py-2 rounded-full">
          🍴 View Recipe
        </span>
      </div>

      {/* Meal name & category */}
      <div className="p-4">
        <h2 className="font-semibold text-lg truncate text-gray-800">
          {item.strMeal}
        </h2>
        <p className="text-gray-500 text-sm">{item.strCategory}</p>
      </div>

      {/* Favorite toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item);
        }}
        className="absolute top-3 right-4 text-xl text-red-500 hover:scale-110 transition"
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default RecipeCard;
