import React, { useContext, useState } from "react";
import { RecipeContext } from "../Context/RecipeContext";
import RecipeCard from "../Components/RecipeCard";
import Pagination from "../Components/Pagination";

const FavoritesPage = () => {
  const { favorites, searchQuery } = useContext(RecipeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 12;

  // Filter favorites with search query
  const filteredFavorites =
    searchQuery.trim() === ""
      ? favorites
      : favorites.filter((meal) =>
          meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const totalPages = Math.ceil(filteredFavorites.length / favoritesPerPage);
  const startIndex = (currentPage - 1) * favoritesPerPage;
  const currentFavorites = filteredFavorites.slice(
    startIndex,
    startIndex + favoritesPerPage
  );

  // Handles page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Show message if no favorites
  if (filteredFavorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-semibold text-gray-500">
        No favorite dishes yet!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-amber-100 pt-10 pb-10">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        Your Favorite Dishes ❤️
      </h1>

      {/* Favorite recipes grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {currentFavorites.map((item) => (
          <RecipeCard key={item.idMeal} item={item} />
        ))}
      </div>

      {/* Pagination if more than one page */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
