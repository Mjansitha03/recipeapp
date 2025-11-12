import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryContext } from "./CategoryContext";

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); // List of all meal categories
  const [categoryMeals, setCategoryMeals] = useState([]); // Meals of selected category
  const [loading, setLoading] = useState(false); // Loading state for category meals

  // Fetch all categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch meals for a specific category
  const fetchCategoryMeals = async (category) => {
    try {
      setLoading(true);

      // Check local storage first to avoid repeated API calls
      const cached = localStorage.getItem(`category_${category}`);
      if (cached) {
        setCategoryMeals(JSON.parse(cached));
        return;
      }

      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      setCategoryMeals(res.data.meals || []);
      localStorage.setItem(`category_${category}`, JSON.stringify(res.data.meals || []));
    } catch (error) {
      console.error("Error fetching category meals:", error);
      setCategoryMeals([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and default category meals on mount
  useEffect(() => {
    fetchCategories();
    fetchCategoryMeals("Beef"); // Default category
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, categoryMeals, fetchCategoryMeals, loading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
