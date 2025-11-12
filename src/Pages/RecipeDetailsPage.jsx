import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../Context/RecipeContext";
import axios from "axios";
import { GiSaltShaker, GiCookingPot } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const { favorites, toggleFavorite } = useContext(RecipeContext);
  const isFavorite = favorites.some((fav) => fav.idMeal === id);

  // Fetch full recipe details from API
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMeal(res.data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (!meal)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-orange-600 animate-pulse">
          Loading recipe details...
        </p>
      </div>
    );

  // Prepare ingredients list dynamically
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ingredient ? `${ingredient} - ${measure}` : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-orange-100 py-10 px-4">
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-3xl shadow-lg">
        {/* Title & Favorite Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          <h3 className="text-3xl font-bold text-emerald-600 text-center sm:text-left">
            {meal.strMeal}
          </h3>
          <button
            onClick={() => toggleFavorite(meal)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              isFavorite
                ? "bg-red-500 text-white shadow-md hover:bg-red-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
          </button>
        </div>

        {/* Recipe Image */}
        <div className="overflow-hidden rounded-2xl mb-8 shadow-md">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full max-h-[450px] object-cover"
          />
        </div>

        {/* Category & Ingredients */}
        <div className="text-gray-700 space-y-8">
          <p className="text-center sm:text-left text-lg">
            <strong>Category:</strong> {meal.strCategory} | <strong>Origin:</strong> {meal.strArea}
          </p>

          <div>
            <h3 className="text-2xl font-semibold mb-3 text-orange-600 flex items-center gap-2">
              <GiSaltShaker className="text-3xl text-orange-600" />
              Ingredients
            </h3>
            <ul className="list-disc marker:text-orange-600 ml-6 space-y-1">
              {ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-orange-600 flex items-center gap-2">
              <GiCookingPot className="text-3xl text-orange-600" />
              Instructions
            </h3>
            <ul className="space-y-3">
              {meal.strInstructions
                .split(/\r?\n|\r|step\s*\d+/i)
                .map((step) => step.trim())
                .filter((step) => step.length > 0)
                .map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>
                      <strong className="text-orange-600">Step {index + 1}:</strong> {step}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          {/* YouTube Tutorial */}
          {meal.strYoutube && (
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-orange-600 flex items-center gap-2">
                <FaYoutube className="text-3xl text-red-600" />
                Watch Tutorial
              </h3>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
