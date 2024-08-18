import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import RecipeCard from "./RecipeCard";
import Stories from "./Stories";


function Home({ user }) {
  const [recipes, setRecipes] = useState([]);

  
  const navigate = useNavigate();
  const navToUploadForm = () => {
    navigate('/upload');
  };

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);


  return (
    <div className="space-y-40 flex flex-col justify-center items-center">

      <section id="welcome" className="flex justify-center">
        <div className="w-1/2 space-y-12 py-16">
      
          <h1 className="text-9xl">Recipe Roots</h1>
          <p className="">Here we celebrate the art of cooking, the joy of sharing, and the warmth of family traditions passed down through generations. We are dedicated to sharing authentic family recipes to a global audience.
             By sharing these recipes, we honor our ancestors and keep their spirits alive in our kitchens.
          </p>

        </div>
      </section>

      <Stories/>

      <section className="flex flex-col items-center justify-center pt-20 space-y-20">
        <div className="w-1/2 space-y-8">
          <h2 className="text-6xl">Explore Global Recipes</h2>
          <p className="text-lg">Discover cherished family recipes and traditions from around the world. Dive into a collection of dishes passed down through generations and explore the rich stories behind each recipe.</p>
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

  

      {/* UPLOAD RECIPE CTA */}
      <section className="w-1/2 p-8 md:p-32 space-y-4">
        <p>Feeling inspired? Share your own family recipe.</p>
        <button onClick={navToUploadForm} className="btn-light">Upload a recipe</button>
      </section>
    </div>
  );
}

export default Home;

