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
      className="recipe-card relative w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-lg overflow-hidden"
      style={{
        color: "whitesmoke",
        height: "500px",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        backgroundImage: bgImage,
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute space-y-12 inset-0 bg-black bg-opacity-50 hover:bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center">
        <Link to={`/recipes/${recipe.id}`} className="hover:border-b mb-12">
          Get Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
