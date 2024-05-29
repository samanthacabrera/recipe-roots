import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Family from "./Family"

function Profile({ user }) {
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

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

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <h2 className="text-4xl font-semibold">Welcome to {user.firstName}'s digital cookbook!</h2>

      <div>
        <h2 className="text-2xl font-semibold py-12">My Uploaded Recipes</h2>
        <ul className="flex flex-row space-x-12">
          {addedRecipes.length === 0 ? (
            <li>No recipes found</li>
          ) : (
            addedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} user={user} />
            ))
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold py-12">My Favorited Recipes</h2>
        <ul className="flex flex-row space-x-12">
          {favoritedRecipes.length === 0 ? (
            <li>No favorited recipes found</li>
          ) : (
            favoritedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} user={user} />
            ))
          )}
        </ul>
      </div>
      
      <Family user={user} />
    </>
  );
}

export default Profile;

