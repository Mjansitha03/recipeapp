import React, { useContext, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import { RecipeContext } from "../Context/RecipeContext";
import Pagination from "../Components/Pagination";

const HomePage = () => {
  const { meals, loading } = useContext(RecipeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 12;

  const totalPages = Math.ceil(meals.length / mealsPerPage);
  const currentMeals = meals.slice(
    (currentPage - 1) * mealsPerPage,
    currentPage * mealsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Show loading state if recipes are being fetched
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold animate-pulse text-orange-600">
          Loading recipes...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-orange-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-linear-to-r from-orange-100 via-amber-50 to-orange-100 rounded-b-3xl shadow-inner">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-orange-700 mb-4">
            Welcome to <span className="text-amber-600">Delishify</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Find inspiration for your next meal with thousands of global recipes.
          </p>
          <button
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition-all cursor-pointer"
            onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
          >
            🍳 Explore Recipes
          </button>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="pt-16 pb-10 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Explore Recipes
        </h2>

        {currentMeals.length === 0 ? (
          <p className="text-gray-500 text-lg text-center mt-10">
            No recipes found. Try another search 🔍
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 animate-fadeIn">
            {currentMeals.map((item) => (
              <RecipeCard key={item.idMeal} item={item} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default HomePage;
