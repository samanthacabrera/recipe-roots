import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import RecipeCard from "./RecipeCard";

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

function Home({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [featuredCountry, setFeaturedCountry] = useState(null);
  
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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setFeaturedCountry(countries[randomIndex]);
  }, []);

  // const globalRecipes = recipes.filter(recipe => recipe.visibility === 'global');
  const filteredRecipes = recipes.filter(recipe => recipe.country === (featuredCountry ? featuredCountry.name : ''));

  return (
    <div className="space-y-40">
      {/* WELCOME HERO */}
      <section id="welcome" className="flex">
        <div className="flex-1 mx-24">
          <h1 className="text-7xl font-semibold leading-loose pt-12">Welcome to Recipe Roots</h1>
          <p className="pt-12">Here we celebrate the art of cooking, the joy of sharing, and the warmth of family traditions passed down through generations. We are dedicated to sharing authentic family recipes to a global audience.</p>
        </div>
        <div className="flex-1 mx-24">
          <img src="https://media.istockphoto.com/id/1130855116/vector/magic-cookbook.jpg?s=612x612&w=0&k=20&c=O-U1He20MPVOJvhAdb4fKvf5dSUoEsi3IuwW5bT2u4I=" alt="Pixelized Books" className="w-full h-auto" />
        </div>
      </section>
      {/* FEATURED */}
      <section className="min-h-screen m-24 px-40">
        {featuredCountry && (
          <>
            <h2 className="text-7xl leading-relaxed font-semibold py-24">
              Featured recipe from <span className="italic">{featuredCountry.name}</span>
            </h2>
            <div className="flex items-center space-x-12">
              <p className="w-3/5 leading-loose">
                {featuredCountry.description}
              </p>
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  user={user}
                  recipe={recipe}
                 />
              ))}
            </div>
          </>
      )}
      </section>
      {/* EXPLORE  */}
      <section className="">
        <h2 className="text-7xl leading-relaxed font-semibold py-24">Recipes from around the world</h2>
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} user={user} recipe={recipe} />
          ))}
        </div>
      </section>


      {/* UPLOAD RECIPE CTA */}
      <section className="">
        <p>Feeling inspired? Share your own family recipe.</p>
        <p>To ensure that the recipes shared on our website align with our mission and purpose, we encourage you to reflect on the following guidelines. These points aim to help you determine if your recipe embodies the emotional depth and cultural significance we cherish:</p>
        <ol>
          <li>Does preparing or eating this dish evoke fond memories or strong emotions for you and your loved ones?</li>
          <li>Do you have a photo of the recipe creator, such as a beloved family member, or the dish itself?</li>
          <li>Is this dish typically prepared for special occasions, holidays, or family gatherings?</li>
          <li>How does this recipe contribute to the celebration of these events and bring people together?</li>
          <li>Is this recipe a representation of your cultural heritage?</li>
        </ol>
        <p>By following these guidelines, you help us maintain the integrity and spirit of our community.</p>
        <button onClick={navToUploadForm}>Let's get started !!</button>
      </section>
    </div>
  );
}

export default Home;

