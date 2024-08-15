import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [favoritesMap, setFavoritesMap] = useState({});
  const [bio, setBio] = useState('');

  const navigate = useNavigate();

  const navToUploadForm = () => {
    navigate('/upload');
  };

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

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Column */}
        <div className="col-span-1 bg-opacity-80 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-4xl mb-4">Welcome, {user.firstName}!</h2>
          <p className="text-gray-600 mb-4">
            This is your profile page where you can manage your recipes and favorites.
          </p>
          <button 
            onClick={navToUploadForm} 
            className="px-4 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition"
          >
            Upload Recipe
          </button>
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Bio</h3>
            <textarea 
              value={bio}
              onChange={handleBioChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Share a bit about yourself..."
            />
          </div>
        </div>

        {/* Recipes Collections */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <div className="bg-olive-100 border border-olive-200 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl mb-4">My Uploaded Recipes</h2>
            <p className="text-gray-600 mb-4">
              Here you can edit or delete the recipes you’ve added.
            </p>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {addedRecipes.length === 0 ? (
                  <p className="text-gray-600">No recipes found</p>
                ) : (
                  addedRecipes.map(recipe => (
                    <div 
                      key={recipe.id} 
                      className="bg-olive-50 border border-olive-200 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
                      style={{ backgroundColor: '#F0F4F0' }}
                    >
                      <h3 className="text-lg font-semibold mb-2 text-olive-800">{recipe.title}</h3>
                      <p className="text-gray-600">{recipe.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-olive-100 border border-olive-200 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl mb-4">My Favorites</h2>
            <p className="text-gray-600 mb-4">
              Here are your favorite recipes. Discover and revisit them anytime.
            </p>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritedRecipes.length === 0 ? (
                  <p className="text-gray-600">No favorited recipes found</p>
                ) : (
                  favoritedRecipes.map(recipe => (
                    <div 
                      key={recipe.id} 
                      className="bg-olive-50 border border-olive-200 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
                      style={{ backgroundColor: '#F0F4F0' }}
                    >
                      <h3 className="text-lg  mb-2 text-olive-800">{recipe.title}</h3>
                      <p className="text-gray-600">{recipe.description}</p>
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
