import React, { useState, useEffect } from "react";
import RecipeDetails from './RecipeDetails';

function RecipeCard({ recipe, user }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`/api/favorites/status?clerk_id=${user.clerk_id}&recipe_id=${recipe.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log('Favorite status response:', data);
        setIsFavorited(data.isFavorited);
      } catch (error) {
        // console.error("Error fetching favorite status", error);
        setIsFavorited(false);
      }
    };

    fetchFavoriteStatus();
  }, [user.clerk_id, recipe.id]);

  const handleToggleFavorite = async () => {
    try {
      console.log(`Toggling favorite for clerk_id: ${user.clerk_id}, recipe_id: ${recipe.id}`);
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerk_id: user.clerk_id, recipe_id: recipe.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Toggle favorite response:', data);
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
      <button
        onClick={handleToggleFavorite}
        className={`px-3 py-1 rounded transition duration-300 focus:outline-none ${isFavorited
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
      >
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}

export default RecipeCard
