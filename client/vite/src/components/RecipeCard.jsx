import React from "react";
import { Link } from "react-router-dom";
import Favorite from "./Favorite";

function RecipeCard({ recipe, user }) {
  return (
    <div className="recipe-card w-full md:w-1/2 lg:w-1/3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{`${recipe.creator_name}'s ${recipe.title} from ${recipe.country}`}</h3>
      <div className="flex items-center justify-between mb-2">
        <Link
          to={`/recipes/${recipe.id}`}
          className="py-1 px-2 bg-blue-100 text-blue-800 rounded transition duration-300 hover:bg-blue-200 focus:outline-none"
        >
          View Full Recipe
        </Link>
        <Favorite recipeId={recipe.id} userId={user.clerk_id} />
      </div>
    </div>
  );
}

export default RecipeCard;
