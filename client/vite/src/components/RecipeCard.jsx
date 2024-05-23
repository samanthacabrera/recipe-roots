import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

function RecipeCard({ recipe, user }) {
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
    <div className="recipe-card w-full md:w-1/2 lg:w-1/3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{`${recipe.creator_name}'s ${recipe.title} from ${recipe.country}`}</h3>
      <div className="flex items-center justify-between mb-2">
        <Link
          to={`/recipes/${recipe.id}`}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded transition duration-300 hover:bg-blue-200 focus:outline-none"
        >
          View Full Recipe
        </Link>
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
      <div className="flex items-center">
        {recipe.user_clerk_id === user.clerk_id && !isUpdatingVisibility ? (
          <select
            value={visibility || ""}
            onChange={handleVisibilityChange}
            className="mr-2 px-3 py-1 rounded border border-gray-300 focus:outline-none"
          >
            <option value="">Select Visibility</option>
            <option value="global">Global</option>
            <option value="family">Family</option>
          </select>
        ) : (
          <span className="mr-2">{`Visibility: ${recipe.visibility}`}</span>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
