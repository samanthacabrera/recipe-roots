import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipe from "./AddRecipe";
import Stories from "./Stories";


const countries = [
  { name: "Mexico", description: "Mexican cuisine is known for its bold flavors and vibrant colors. It has a rich history that combines indigenous ingredients and techniques with Spanish colonial influences." },
  { name: "Peru", description: "Peruvian cuisine is celebrated for its diversity; blending indigenous ingredients with influences from Spain, Africa, China, and Japan. It is famous for dishes like ceviche and its use of potatoes and corn." },
  { name: "Cambodia", description: "Cambodian cuisine features a mix of flavors and textures, often incorporating rice, fish, and fresh herbs. It reflects the country's history and cultural exchanges with neighboring countries." }
];

function Global({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [featuredCountry, setFeaturedCountry] = useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setFeaturedCountry(countries[randomIndex]);
  }, []);

  const generateRandomRecipe = () => {
    const globalRecipes = recipes.filter(recipe => recipe.visibility === 'global');
    const randomIndex = Math.floor(Math.random() * globalRecipes.length);
    setRandomRecipe(globalRecipes[randomIndex]);
  };

  const globalRecipes = recipes.filter(recipe => recipe.visibility === 'global');
  const filteredRecipes = globalRecipes.filter(recipe => recipe.country === (featuredCountry ? featuredCountry.name : ''));

  return (
    <div className="space-y-40">
      
      <Stories />

      <div>
      <h1 className="text-4xl">Welcome to Recipe Roots</h1>
      <p>
        A platform dedicated to preserving culture through recipes.
      </p>
      </div>
      
      {featuredCountry && (
          <>
            <h2 className="text-3xl font-semibold">Featured recipes from {featuredCountry.name}</h2>
            <p className="text-center m-12">{featuredCountry.description}</p>
            <div className="carousel flex overflow-x-scroll space-x-4">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} user={user} recipe={recipe} />
              ))}
          </div>
        </>
      )}


      <p className="text-center font-semibold text-4xl m-8">List of all recipes</p>
      <div id="global-recipe-list" className="flex flex-wrap justify-center space-x-12">
        {globalRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} user={user} recipe={recipe} />
        ))}
      </div>

      <div id='random-recipe' className="flex flex-col items-center">
        <button className="p-2 rounded outline w-fit mb-4" onClick={generateRandomRecipe}>
          Generate Random Recipe
        </button>
        {randomRecipe &&
          <RecipeCard user={user} recipe={randomRecipe} />
        }
      </div>

      <AddRecipe />
    </div>
  );
}

export default Global;

