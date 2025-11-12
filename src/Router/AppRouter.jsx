import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import HomePage from "../Pages/HomePage";
import FavoritesPage from "../Pages/FavoritesPage";
import CategoryPage from "../Pages/CategoryPage";
import RecipeDetailsPage from "../Pages/RecipeDetailsPage";
import Footer from "../Components/Footer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRouter;

