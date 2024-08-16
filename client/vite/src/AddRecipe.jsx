import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
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
        alert("Recipe successfully added!!");
        setIsSubmitted(true);
      } else {
        console.error('Failed to add recipe');
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Failed to add recipe:", error.message);
    }
  };

  const socialMediaLinks = [
    { url: "https://facebook.com", text: "Share to Facebook", icon: faFacebook, color: "text-blue-600" },
    { url: "https://twitter.com", text: "Share to Twitter", icon: faTwitter, color: "text-blue-400" },
    { url: "https://instagram.com", text: "Share to Instagram", icon: faInstagram, color: "text-pink-600" },
    { url: "https://pinterest.com", text: "Share to Pinterest", icon: faPinterest, color: "text-red-500" }
];

  return (
    <div className="w-screen h-screen bg-olive-700 bg-opacity-30 flex flex-col justify-center items-center">
      {isSubmitted ? (
        <div className="max-w-md px-12 py-8 my-2 bg-gray-100 text-gray-700 rounded-lg shadow-md space-y-4">
          <h3 className="text-2xl">Recipe successfully added!</h3>
          <p className="text-sm">Use the links below to share your recipe with friends and family.</p>
          <div className="space-y-6">
            {socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out">
                <span className="mr-2">{link.text}</span>
                <FontAwesomeIcon icon={link.icon} className={`text-xl ${link.color}`} />
              </a>
            ))}
          </div>
          <p><a href="/">&larr; </a> Explore recipes</p>
        </div>
      ) : (
        <RecipeForm initialData={initialData} onSubmit={handleSubmit} />
      )}
    </div>
  )
};

export default AddRecipe;
