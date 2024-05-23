import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import RecipeDetails from "./RecipeDetails";

function RecipeCard({ recipe, user }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);
  const [visibility, setVisibility] = useState(recipe.visibility || "");

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`/api/favorites/status?clerk_id=${user.clerk_id}&recipe_id=${recipe.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      } catch (error) {
        setIsFavorited(false);
      }
    };

    fetchFavoriteStatus();
  }, [user.clerk_id, recipe.id]);

  const handleToggleFavorite = async () => {
    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerk_id: user.clerk_id, recipe_id: recipe.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      } else {
        console.error("Failed to toggle favorite status");
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
    }
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleVisibilityChange = async (event) => {
    setIsUpdatingVisibility(true);
    try {
      const newVisibility = event.target.value;
      const data = {
        visibility: newVisibility,
        clerk_id: user.clerk_id 
      };

      const response = await fetch(`/api/recipes/${recipe.id}/visibility`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      if (response.ok) {
        setVisibility(newVisibility);
      } else {
        console.error("Failed to update visibility");
      }
    } catch (error) {
      console.error("Error updating visibility:", error);
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  return (
    <div className="recipe-card w-fit pr-24 border border-gray-200 rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{recipe.title}</h3>
      <p className="text-gray-600 mb-4">{recipe.desc}</p>
      <button
        onClick={handleToggleDetails}
        className="mb-2 px-3 py-1 bg-gray-100 text-gray-800 rounded transition duration-300 hover:bg-gray-200 focus:outline-none"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="mb-2">
          <RecipeDetails recipe={recipe} />
        </div>
      )}
      <Link
        to={`/recipes/${recipe.id}`}
        className="mb-2 px-3 py-1 bg-blue-100 text-blue-800 rounded transition duration-300 hover:bg-blue-200 focus:outline-none"
      >
        View Full Recipe
      </Link>
      <div className="flex items-center mt-2">
        {recipe.user_clerk_id === user.clerk_id && !isUpdatingVisibility ? (
          <select
            value={visibility || ""}
            onChange={handleVisibilityChange}
            className="mr-2 px-3 py-1 rounded focus:outline-none"
          >
            <option value="">Select Visibility</option>
            <option value="global">Global</option>
            <option value="family">Family</option>
          </select>
        ) : (
          <span className="mr-2">{`Visibility: ${recipe.visibility}`}</span>
        )}
        <button
          onClick={handleToggleFavorite}
          className={`px-3 py-1 rounded transition duration-300 focus:outline-none ${
            isFavorited
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
        >
          {isFavorited ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
