import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

function Profile({ user }) {
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [favoritesMap, setFavoritesMap] = useState({});

  useEffect(() => {
    const fetchAddedRecipes = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/users/${user.clerk_id}/recipes`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setAddedRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    const fetchFavoritedRecipes = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/users/${user.clerk_id}/favorited_recipes`);
        if (!response.ok) {
          throw new Error('Failed to fetch favorited recipes');
        }
        const data = await response.json();
        setFavoritedRecipes(data);
        const favMap = {};
        data.forEach(recipe => {
          favMap[recipe.id] = true;
        });
        setFavoritesMap(favMap);
      } catch (error) {
        console.error('Error fetching favorited recipes:', error);
      }
    };

    fetchAddedRecipes();
    fetchFavoritedRecipes();
  }, [user]);

  const toggleFavorite = async (recipeId) => {
    try {
      const isFavorited = favoritesMap[recipeId] || false;
      const response = await fetch(`/api/users/${user.clerk_id}/recipes/${recipeId}/favorite`, {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: !isFavorited }),
      });

      if (!response.ok) {
        throw new Error(isFavorited ? 'Failed to unfavorite recipe' : 'Failed to favorite recipe');
      }

      const updatedMap = { ...favoritesMap };
      updatedMap[recipeId] = !isFavorited;
      setFavoritesMap(updatedMap);

      // Update favoritedRecipes state to reflect changes immediately
      if (!isFavorited) {
        const recipeResponse = await fetch(`/api/recipes/${recipeId}`);
        if (!recipeResponse.ok) {
          throw new Error('Failed to fetch updated recipe details');
        }
        const updatedRecipe = await recipeResponse.json();
        setFavoritedRecipes(prevFavorited => [...prevFavorited, updatedRecipe]);
      } else {
        setFavoritedRecipes(prevFavorited => prevFavorited.filter(recipe => recipe.id !== recipeId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Column */}
        <div className="col-span-1">
          <h2 className="text-4xl">Welcome, {user.firstName}!</h2>
        </div>

        {/* Recipes Collections */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <div className="bg-white border shadow-lg rounded-lg p-6">
            <h2 className="text-2xl mb-4">My Uploaded Recipes</h2>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {addedRecipes.length === 0 ? (
                  <p className="text-gray-600">No recipes found</p>
                ) : (
                  addedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} user={user} />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border shadow-lg rounded-lg p-6">
            <h2 className="text-2xl mb-4">My Favorites</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-6">
                {favoritedRecipes.length === 0 ? (
                  <p className="text-gray-600">No favorited recipes found</p>
                ) : (
                  favoritedRecipes.map(recipe => (
                    <div key={recipe.id} className="">
                      <RecipeCard recipe={recipe} user={user} />
                    
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
