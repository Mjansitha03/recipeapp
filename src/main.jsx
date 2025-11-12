import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CategoryProvider } from "./Context/CategoryProvider.jsx";
import { RecipeProvider } from "./Context/RecipeProvider.jsx";


createRoot(document.getElementById("root")).render(
  <CategoryProvider>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </CategoryProvider>
);

