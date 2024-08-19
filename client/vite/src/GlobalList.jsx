import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";


function GlobalList(user) {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);
  return (
      <section className="flex flex-col items-center pt-20 space-y-20">
            <div className="w-2/3">
                <div className="w-full space-y-4">
                <h1 className="text-6xl">Recipe Collection</h1>
                <p className="text-lg">Browse and discover cherished family recipes from around the world.</p>
                </div>
            </div>
            
            <div className="recipe-list">
            {recipes.map((recipe) => (
                <div>
                <h3 className="text-xl py-6">
                    {`${recipe.creator_name}'s ${recipe.title} recipe`}
                </h3>
    
                <RecipeCard key={recipe.id} user={user} recipe={recipe} />
                </div>  
            ))}
            </div>
        
        </section>
  );
};

export default GlobalList;
