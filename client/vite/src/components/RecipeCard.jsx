import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Favorite from "./Favorite";

function RecipeCard({ recipe, user }) {
  const [bgImage, setBgImage] = useState(""); 

  useEffect(() => {
    if (recipe.creator_photo_public_id) {
      setBgImage(`url(${recipe.creator_photo_public_id})`);
    }
  }, [recipe.creator_photo_public_id]); 

  return (
    <div
      className="recipe-card w-full md:w-1/2 lg:w-1/3 p-4 border border-gray-200 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-lg"
      style={{
        color: 'white',
        height: '500px', 
        width: '350px',  
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer',
        backgroundImage: bgImage, 
        backgroundSize: 'cover',
      }}
      onClick={() => window.location.href = `/recipes/${recipe.id}`} 
    >
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white">
          {`${recipe.creator_name}'s ${recipe.title} from ${recipe.country}`}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <Link
          to={{
            pathname: `/recipes/${recipe.id}`,
            state: { recipe: recipe } 
          }}
          className="py-1 px-2 bg-blue-100 text-blue-800 rounded transition duration-300 hover:bg-blue-200 focus:outline-none"
        >
          View Full Recipe
        </Link>
        <Favorite recipeId={recipe.id} userId={user.clerk_id} />
      </div>
    </div>
  );
}

export default RecipeCard;
