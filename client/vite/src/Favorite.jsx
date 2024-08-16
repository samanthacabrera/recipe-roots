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
        console.error('Error fetching favorite status:', error);
        setIsFavorited(false);
      }
    };

    fetchFavoriteStatus();
  }, [userId, recipeId]);

  const handleToggleFavorite = async (event) => {
    event.stopPropagation(); 
    try {
      console.log('Toggling favorite status...');
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
        console.log('Favorite status toggled successfully:', data.isFavorited);
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
      className="btn-light"
    >
      {isFavorited ? "Unfavorite" : "Favorite"}
    </button>
  );
}

export default Favorite;
