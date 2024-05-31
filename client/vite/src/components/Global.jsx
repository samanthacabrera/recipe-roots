import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Stories from "./Stories";
import RecipeCard from "./RecipeCard";
import AddRecipe from "./AddRecipe";


const countries = [
    { 
    name: "Malaysia", 
    description: "Malaysian cuisine is a vibrant and diverse tapestry of flavors, influenced by Malay, Chinese, Indian, and indigenous culinary traditions. It is characterized by its bold and aromatic spices, fresh herbs, and rich sauces. With a focus on layering flavors and textures, Malaysian dishes often feature a harmonious balance of sweet, sour, salty, and spicy elements. From fragrant coconut-based curries to tangy noodle soups and aromatic rice dishes, Malaysian cuisine offers a tantalizing journey through its rich cultural heritage and culinary diversity." 
  },
  { 
    name: "Lebanon", 
    description: "Lebanese cuisine is celebrated for its rich and aromatic flavors, drawing from a medley of Mediterranean and Middle Eastern influences. Fresh herbs, olive oil, garlic, and lemon juice are staple ingredients, creating vibrant and zesty dishes. Lebanese food is known for its mezze, a selection of small dishes that include hummus, tabbouleh, and baba ghanoush. Grilled meats, fresh vegetables, and hearty grains are also central to Lebanese cuisine, which emphasizes balance and harmony in its use of flavors and ingredients." 
  },
  { 
    name: "Senegal", 
    description: "Senegalese cuisine is a reflection of the country’s diverse ethnic groups and rich cultural heritage. It is characterized by its bold and flavorful dishes, often featuring fresh fish, peanuts, and a variety of vegetables. Spices and herbs such as chili, garlic, and ginger play a significant role, adding depth and complexity to the flavors. Traditional dishes like Thieboudienne (fish and rice) and Yassa (marinated chicken or fish) showcase the vibrant and dynamic nature of Senegalese food, offering a unique and satisfying culinary experience." 
  }
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
    
      
      {featuredCountry && (
          <>
            <h2 className="pt-40 text-2xl">Featured recipe from {featuredCountry.name}</h2>
            <p className="mx-56 -translate-y-12">{featuredCountry.description}</p>
            <div className="flex flex-col items-center">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} user={user} recipe={recipe} />
              ))}
          </div>
        </>
      )}

      <p className="text-2xl">Browse recipes from around the world</p>
   
      <div className="ml-24 recipe-list">
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

