import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipe from "./AddRecipe";

const countries = [
  { name: "Mexico", description: "Mexican cuisine is known for its bold flavors and vibrant colors. It has a rich history that combines indigenous ingredients and techniques with Spanish colonial influences." },
  { name: "Peru", description: "Peruvian cuisine is celebrated for it diversity; blending indigenous ingredients with influences from Spain, Africa, China, and Japan. It is famous for dishes like ceviche and its use of potatoes and corn." },
  { name: "Cambodia", description: "Cambodian cuisine features a mix of flavors and textures, often incorporating rice, fish, and fresh herbs. It reflects the country's history and cultural exchanges with neighboring countries." }
];

function Global({user}) {

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
        const randomIndex = Math.floor(Math.random() * recipes.length);
        setRandomRecipe(recipes[randomIndex]);
  };
  //  console.log('User in Explore component:', user);

return (
        <>
        <div id='hero'>
          <h1 className="text-9xl font-bolder m-12">Recipe Roots</h1>
        </div>

        {featuredCountry && (
          <div id='featured' className="w-screen h-screen flex flex-col justify-center items-center bg-white">
            <h2 className="text-3xl font-semibold">Featured recipes from {featuredCountry.name}</h2>
            <p className="text-center m-12">{featuredCountry.description}</p>
            <div className="carousel flex overflow-x-scroll space-x-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-64 h-64 bg-gray-300 flex-shrink-0 rounded-lg flex items-center justify-center text-center">
                  <p className="text-xl">Recipe {index + 1} from {featuredCountry.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div id='random-recipe' className="flex flex-col ml-[40%] space-y-8">
          <button className="p-2 rounded outline w-fit" onClick={generateRandomRecipe}>Generate Random Recipe</button>
          {randomRecipe && <RecipeCard user={user} recipe={randomRecipe} />}
        </div>
        
        <p className="text-center font-semibold text-4xl m-8">List of all recipes</p>
        <div id="recipe-list"  className="flex flex-row space-x-12">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} user={user} recipe={recipe} />
            ))}
        </div>
        
        <AddRecipe/>
        </>
    )
}

export default Global