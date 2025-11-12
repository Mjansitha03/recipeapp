import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { RecipeContext } from "./RecipeContext";

// Reducer to handle favorites actions
const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.some((m) => m.idMeal === action.payload.idMeal)) return state; // Avoid duplicates
      return [...state, action.payload];

    case "REMOVE_FAVORITE":
      return state.filter((meal) => meal.idMeal !== action.payload.idMeal);

    case "SET_FAVORITES":
      return action.payload || [];

    default:
      return state;
  }
};

// Initialize favorites from local storage
const initFavorites = () => {
  try {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const RecipeProvider = ({ children }) => {
  const [meals, setMeals] = useState([]); // All recipes
  const [loading, setLoading] = useState(true); // Loading state
  const [favorites, dispatch] = useReducer(favoriteReducer, [], initFavorites); // Favorite meals
  const [searchQuery, setSearchQuery] = useState(""); // Global search query

  // Fetch all recipes alphabetically (a-z)
  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      const responses = await Promise.all(
        alphabet.map((l) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
        )
      );
      const allMeals = responses.flatMap((res) => res.data.meals || []);
      setMeals(allMeals);
      localStorage.setItem("meals", JSON.stringify(allMeals)); // Cache recipes
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search recipes by name
  const searchMeals = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchRecipe(); // Show all recipes if search is empty
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setMeals(res.data.meals || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add/remove recipe from favorites
  const toggleFavorite = (meal) => {
    const exists = favorites.some((fav) => fav.idMeal === meal.idMeal);
    dispatch({
      type: exists ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
      payload: meal,
    });
  };

  // Sync favorites to local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Initialize meals on app load
  useEffect(() => {
    const init = async () => {
      const cached = localStorage.getItem("meals");
      if (cached) setMeals(JSON.parse(cached));
      else await fetchRecipe();
      setLoading(false);
    };
    init();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        meals,
        loading,
        favorites,
        toggleFavorite,
        fetchRecipe,
        searchMeals,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
