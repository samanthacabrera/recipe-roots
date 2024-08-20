import React, { useState, useEffect } from "react";

function Favorite({ recipeId, userId }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        if (!userId) return; // Skip fetching if user is not signed in

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
    if (!userId) return; // Do nothing if user is not signed in

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
      className={`btn ${!userId ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={!userId}
    >
      {isFavorited ? "Unfavorite" : "Favorite"}
    </button>
  );
}

export default Favorite;
