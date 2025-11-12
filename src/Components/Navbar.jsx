import React, { useContext, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { RecipeContext } from "../Context/RecipeContext";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/delishify-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchMeals, fetchRecipe, searchQuery, setSearchQuery } =
    useContext(RecipeContext);
  const location = useLocation();

  // Handles search submission
  const handleSearch = (e) => {
    e.preventDefault();
    searchMeals(searchQuery);
  };

  // Clears search and reloads recipes
  const handleClear = () => {
    setSearchQuery("");
    fetchRecipe();
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 px-4 sm:px-8 py-3">
      <div className="flex justify-between items-center">
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Delishify Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-extrabold">
            <span className="text-orange-500">elish</span>
            <span className="text-emerald-600">ify</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={searchQuery}
              placeholder="🔍 Search dishes..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onInput={(e) => e.target.value === "" && handleClear()}
              className="border border-gray-300 rounded-full pl-4 pr-10 py-2 w-56 focus:ring-2 focus:ring-orange-400"
            />
          </form>

          {/* Highlight active route */}
          <Link
            to="/category"
            className={`hover:text-orange-500 font-medium ${
              location.pathname === "/category" ? "text-orange-500" : ""
            }`}
          >
            Categories
          </Link>

          <Link
            to="/favorites"
            className={`hover:text-orange-500 font-medium ${
              location.pathname === "/favorites" ? "text-orange-500" : ""
            }`}
          >
            Favorites ❤️
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-slate-700"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col items-center mt-4 gap-3 md:hidden border-t pt-4">
          <form onSubmit={handleSearch} className="w-full max-w-xs">
            <input
              type="search"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg pl-3 py-2 w-full focus:ring-2 focus:ring-orange-400"
            />
          </form>

          <Link
            to="/category"
            className="hover:text-orange-500 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/favorites"
            className="hover:text-orange-500 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Favorites ❤️
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
