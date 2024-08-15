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
    <div className="space-y-40">

      <section id="welcome" className="flex">
        <div className="flex-1 p-24">
          <h1 className="text-2xl leading-loose">Welcome to <span className="block text-9xl">Recipe Roots</span></h1>
          <p className="pt-12">Here we celebrate the art of cooking, the joy of sharing, and the warmth of family traditions passed down through generations. We are dedicated to sharing authentic family recipes to a global audience.</p>
        </div>
        <div className="flex-1 mx-24">
          <img src="https://media.istockphoto.com/id/1130855116/vector/magic-cookbook.jpg?s=612x612&w=0&k=20&c=O-U1He20MPVOJvhAdb4fKvf5dSUoEsi3IuwW5bT2u4I=" alt="Pixelized Books" className="w-full h-auto" />
        </div>
      </section>

      <Stories/>

      <section className="">
        <h2 className="text-7xl py-24">Recipes from around the world</h2>
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} user={user} recipe={recipe} />
          ))}
        </div>
      </section>

  

      {/* UPLOAD RECIPE CTA */}
      <section className="p-8 md:p-32">
        <p>Feeling inspired? Share your own family recipe.</p>
        <button onClick={navToUploadForm} className="bg-olive-600 text-slate-50 rounded-full p-2 m-4">Upload a recipe</button>
      </section>
    </div>
  );
}

export default Home;

