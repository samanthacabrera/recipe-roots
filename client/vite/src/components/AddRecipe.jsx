import React from 'react';
import RecipeForm from './RecipeForm';

const AddRecipe = () => {
  const initialData = {
    creator_name: "",
    creator_nickname: "",
    creator_photo_public_id: "",
    memory: "",
    title: "",
    country: "",
    desc: "",
    visibility: "global",
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
        alert("Recipe successfully added!!");
      } else {
        console.error('Failed to add recipe');
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Failed to add recipe:", error.message);
    }
  };

  return (
    <div>
      <RecipeForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  )
};

export default AddRecipe;
