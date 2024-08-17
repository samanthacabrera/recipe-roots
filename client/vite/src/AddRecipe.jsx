import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipeForm from './RecipeForm';

function AddRecipe() {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        console.log('Recipe successfully added!!');
        setIsSubmitted(true);
      } else {
        console.error('Failed to add recipe');
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Failed to add recipe:", error.message);
    }
  };

  return (
    <div className="w-screen h-screen  flex flex-col justify-center items-center">
      {isSubmitted ? (
        <div className="p-20 bg-black bg-opacity-5 rounded-lg shadow-md ">
          <h3 className="text-2xl mb-12">Recipe successfully added!</h3>
          <a href="/">&larr; Explore more recipes</a>
        </div>
      ) : (
        <RecipeForm initialData={initialData} onSubmit={handleSubmit} />
      )}
    </div>
  )
};

export default AddRecipe;
