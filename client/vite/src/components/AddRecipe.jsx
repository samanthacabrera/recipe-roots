import React, { useState } from "react";

function AddRecipe() {
  const [formData, setFormData] = useState({
    title: ""
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      title: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create_recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
        if (response.ok) {
              alert("Recipe successfully added!!");
        // Reset the form
        setFormData({
          title: ""
        });
    
      } else {
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Failed to add recipe:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          title="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <button type="submit">
          Add Recipe
        </button>
      </div>
    </form>
  );
}

export default AddRecipe;
