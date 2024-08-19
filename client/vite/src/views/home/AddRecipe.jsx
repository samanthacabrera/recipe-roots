import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../../components/RecipeForm';

function AddRecipe() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recipeLink, setRecipeLink] = useState(null);
  const [showForm, setShowForm] = useState(false); 

  const navigate = useNavigate();

  const navToUploadForm = () => {
    setShowForm(true); 
  };

  const initialData = {
    creator_name: "",
    creator_nickname: "",
    creator_photo_public_id: "",
    memory: "",
    title: "",
    country: "",
    desc: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    directions: [{ step: "" }]
  };

  const handleSubmit = async (formData) => {
    console.log('Submitting recipe data:', formData);
    try {
      const response = await fetch("/api/create_recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          clerk_id: window.Clerk.user.id,
          creator_photo_public_id: formData.creator_photo_public_id
        })
      });
      if (response.ok) {
        const data = await response.json();
        const recipeId = data.id; 
        const recipeURL = `/recipe/${recipeId}`;
        setRecipeLink(recipeURL);
        setIsSubmitted(true);
        console.log('Recipe successfully added!!');
      } else {
        console.error('Failed to add recipe');
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Failed to add recipe:", error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {isSubmitted ? (
        <div className="bg-black bg-opacity-5 rounded-lg shadow-md space-y-6">
            <h3 className="mb-8">Recipe successfully added.</h3>

            <div className="btn-light">
              <a href={recipeLink} target="_blank" rel="noopener noreferrer">View your recipe &rarr; </a>
            </div>
                        
            <div className="btn-light">
              <a href="/" >&larr; Explore more recipes</a>
            </div>
        </div>
      ) : (
        <>
          {!showForm ? (
            <div className="w-1/2 space-y-4">
              <p>Feeling inspired? Share your own family recipe.</p>
              <button onClick={navToUploadForm} className="btn-light">Upload a recipe</button>
            </div>
          ) : (
            <RecipeForm initialData={initialData} onSubmit={handleSubmit} />
          )}
        </>
      )}
    </div>
  );
}

export default AddRecipe;
