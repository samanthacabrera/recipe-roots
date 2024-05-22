import React from "react";

function RecipeDetails({ recipe }) {
  return (
    <div className="recipe-details">
      <h4>Description</h4>
      <p>{recipe.desc}</p>

      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}</li>
        ))}
      </ul>

      <h4>Directions</h4>
      <ol>
        {recipe.directions && recipe.directions.map((direction, index) => (
          <li key={index}>{direction.step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;
