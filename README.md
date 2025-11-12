## Delishify 🍴

Delishify is a dynamic, modern recipe web application that allows users to browse, search, filter, and save their favorite recipes. Powered by TheMealDB API, it provides a seamless experience to discover recipes from all around the world.


## Features

🌍 Browse thousands of recipes from different categories.
🔍 Global search for recipes by name.
📂 Filter recipes by category.
❤️ Add or remove favorite recipes and view them later.
📺 Watch recipe tutorials on YouTube.
⚡ Responsive UI optimized for desktop, tablet, and mobile.
🏷️ Caching with localStorage for faster loading and offline access.

## Demo

Live Demo: https://recipeapp-sable-two.vercel.app/


## Tech Stack

Frontend: React.js, React Router DOM, Tailwind CSS
State Management: React Context + useReducer
Icons: React Icons (HiMenu, HiX, FaHeart, GiSaltShaker, GiCookingPot, FaYoutube)
HTTP Requests: Axios
API: TheMealDB API
Persistence: localStorage for caching meals and favorites

## Installation

1. Clone the repository:

git clone https://github.com/Mjansitha03/recipeapp.git.
cd recipeapp

2. Install dependencies:

npm install

3. Start the development server:

npm start

4. Open http://localhost:5173/
in your browser.

## Usage

Navigate through categories to explore meals.
Use the search bar to find specific recipes.
Click on a recipe card to view details, ingredients, instructions, and YouTube tutorials.
Add recipes to favorites using the heart icon.
Access your favorites page to view all saved recipes.
Use pagination to navigate through long lists of meals.

## Project Structure
delishify/
├─ public/
├─ src/
│ ├─ assets/ # Images, logos
│ ├─ Components/ # Reusable UI components
│ │ ├─ Navbar.jsx
│ │ ├─ RecipeCard.jsx
│ │ └─ Pagination.jsx
│ ├─ Context/ # React Context Providers
│ │ ├─ RecipeContext.jsx
│ │ └─ CategoryContext.jsx
│ ├─ Pages/ # Page components
│ │ ├─ HomePage.jsx
│ │ ├─ CategoryPage.jsx
│ │ ├─ FavoritesPage.jsx
│ │ └─ RecipeDetailsPage.jsx
│ ├─ App.jsx
│ └─ index.js
├─ package.json
└─ README.md

## API
## The project uses TheMealDB API
## for fetching recipe data:

1. Categories: https://www.themealdb.com/api/json/v1/1/categories.php
2. Search by name: https://www.themealdb.com/api/json/v1/1/search.php?s={query}
3. Filter by category: https://www.themealdb.com/api/json/v1/1/filter.php?c={category}
4. Recipe details: https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}


## Contributing

Contributions are welcome!
Fork the repository
Create a branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/YourFeature)
Open a Pull Request

## License

This project is MIT Licensed.
