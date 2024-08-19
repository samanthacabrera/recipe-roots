import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/clerk-react";
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


  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container w-1/2 translate-x-1/2 pt-10 min-h-screen">
      <div className="grid grid-cols-1 gap-8">
        
        <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-4">
          <div className="flex justify-center space-x-2 m-2">
            <UserButton />
            <h2 className="text-2xl">Hello, {user.firstName}!</h2>
          </div>

          <p className="font-light">
            This is your profile page where you can manage your recipes and favorites. Use the dropdown below to switch between your uploaded recipes and favorited recipes.
          </p>

        </div>

        {/* Recipes Card */}
        <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-4">
          
          <div className="mb-4">
            <select 
              value={activeTab}
              onChange={handleTabChange}
              className="block w-full p-2 border border-gray-300 rounded-lg text-gray-400 focus:outline-none"
            >
              <option value="favorited">Favorited Recipes</option>
              <option value="uploaded">Uploaded Recipes</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left m-4">
            {activeTab === 'uploaded' ? (
              addedRecipes.length === 0 ? (
                <p className="">No uploaded recipes found</p>
              ) : (
                addedRecipes.map(recipe => (
                  <Link key={recipe.id} to={`/recipes/${recipe.id}`} >
                    <h4>{recipe.title}</h4>
                  </Link>
                ))
              )
            ) : (
              favoritedRecipes.length === 0 ? (
                <p className="">No favorited recipes found</p>
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
