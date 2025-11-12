import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../Context/CategoryContext";
import { RecipeContext } from "../Context/RecipeContext";
import RecipeCard from "../Components/RecipeCard";
import Pagination from "../Components/Pagination";

const CategoryPage = () => {
  const { categoryMeals, fetchCategoryMeals, loading } =
    useContext(CategoryContext);
  const { searchQuery } = useContext(RecipeContext);

  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 12;

  const mealsList = Array.isArray(categoryMeals) ? categoryMeals : [];

  // Fetch recipes when category changes
  useEffect(() => {
    fetchCategoryMeals(selectedCategory);
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(mealsList.length / mealsPerPage));
  const startIndex = (currentPage - 1) * mealsPerPage;
  const currentMeals = mealsList.slice(startIndex, startIndex + mealsPerPage);

  // Apply search filter inside current category
  const filteredMeals =
    searchQuery.trim() === ""
      ? currentMeals
      : currentMeals.filter((meal) =>
          meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const categories = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Breakfast",
    "Goat",
  ];

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-amber-100 pt-24 pb-10 flex flex-col items-center">
      {/* Category Buttons */}
      <div className="w-full overflow-x-auto scrollbar-hide mb-8">
        <ul className="flex flex-nowrap sm:flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md cursor-pointer font-medium text-white transition ${
                selectedCategory === category
                  ? "bg-amber-600 scale-105 shadow-md"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Meals Grid */}
      {loading ? (
        <p className="text-gray-500 text-lg animate-pulse">
          Loading recipes...
        </p>
      ) : filteredMeals.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {filteredMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} item={meal} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg font-medium">No recipes found.</p>
      )}

      {/* Pagination */}
      {mealsList.length > mealsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CategoryPage;
