import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Profile({ user }) {
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('uploaded');

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
      } catch (error) {
        console.error('Error fetching favorited recipes:', error);
      }
    };

    fetchAddedRecipes();
    fetchFavoritedRecipes();
  }, [user]);

  const handleBioChange = (e) => {
    // Handle bio change
  };

  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* User Info and Bio Card */}
        <div className="col-span-1 bg-black bg-opacity-10 rounded-lg shadow-lg p-4">
          <h2 className="text-2xl mb-2">Hello, {user.firstName}!</h2>
          <p className="font-light m-4">
            This is your profile page where you can manage your recipes and favorites. Use the dropdown below to switch between your uploaded recipes and favorited recipes.
          </p>
          <div className="mt-4 p-4 ">
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <textarea 
              value={user.bio || ''}
              onChange={handleBioChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Update your bio..."
            />
          </div>
        </div>

        {/* Recipes Card */}
        <div className="col-span-3 bg-black bg-opacity-10 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl mb-4">My Recipes</h2>
          <div className="mb-4">
            <select 
              value={activeTab}
              onChange={handleTabChange}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="uploaded">Uploaded Recipes</option>
              <option value="favorited">Favorited Recipes</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeTab === 'uploaded' ? (
              addedRecipes.length === 0 ? (
                <p className="text-gray-600">No uploaded recipes found</p>
              ) : (
                addedRecipes.map(recipe => (
                  <Link key={recipe.id} to={`/recipes/${recipe.id}`} >
                    <h4>{recipe.title}</h4>
                  </Link>
                ))
              )
            ) : (
              favoritedRecipes.length === 0 ? (
                <p className="text-gray-600">No favorited recipes found</p>
              ) : (
                favoritedRecipes.map(recipe => (
                  <Link key={recipe.id} to={`/recipes/${recipe.id}`} >
                    <h4>{recipe.title}</h4>
                  </Link>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
