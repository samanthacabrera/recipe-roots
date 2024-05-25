import React, { useState, useEffect } from "react";

function Favorite({ recipeId, userId }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`/api/favorites/status?clerk_id=${userId}&recipe_id=${recipeId}`);
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
  }, [userId, recipeId]);

  const handleToggleFavorite = async () => {
    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerk_id: userId, recipe_id: recipeId }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
        // note to sam: find alternative method to avoid a full page reload
        window.location.reload();
      } else {
        console.error("Failed to toggle favorite status");
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
    }
  };

  return (
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
  );
}

export default Favorite;
