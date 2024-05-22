import React, { useState, useEffect } from "react";

function AddRecipe() {
  const [step, setStep] = useState(1);
  const [isInFamily, setIsInFamily] = useState(false);

 useEffect(() => {
    const fetchFamilyStatus = async () => {
      try {
        const response = await fetch(`/api/family/status?clerk_id=${window.Clerk.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setIsInFamily(data.isInFamily);
      } catch (error) {
        console.error("Failed to fetch family status:", error.message);
      }
    };

    fetchFamilyStatus();
  }, []);


  const [formData, setFormData] = useState({
    creator_name: "",
    creator_nickname: "",
    creator_photo: "",
    creator_memory: "",
    title: "",
    country: "",
    desc: "",
    visibility: "global",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    directions: [{ step: "" }]
  });

const handleInputChange = (index, type, name, value) => {
  if (Array.isArray(formData[type])) {
    const updatedData = formData[type].map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormData(prevState => ({
      ...prevState,
      [type]: updatedData
    }));
  } else {
    setFormData(prevState => ({
      ...prevState,
      [type]: value 
    }));
  }
};

  const handleAddInput = (type) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: [...formData[type], type === "ingredients" ? { name: "", quantity: "", unit: "" } : { step: "" }]
    }));
  };

  const handleRemoveInput = (index, type) => {
    const updatedData = formData[type].filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      [type]: updatedData
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
        body: JSON.stringify({
          ...formData,
          clerk_id: window.Clerk.user.id
        })
      });
      if (response.ok) {
        alert("Recipe successfully added!!");
        setFormData({
          creator_name: "",
          creator_nickname: "",
          creator_photo: "",
          creator_memory: "",
          title: "",
          country: "",
          desc: "",
          visibility: "global", 
          ingredients: [{ name: "", quantity: "", unit: "" }],
          directions: [{ step: "" }]
        });
        setStep(1);
      } else {
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Failed to add recipe:", error.message);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
return (
    <div className="max-w-2xl mx-auto p-24">
      <h2 className="text-center text-2xl font-semibold mb-4">Share your own family recipes!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div>
            <div className="mb-2">
              <label htmlFor="creator_name" className="block text-sm font-medium">Creator's Name</label>
              <input
                type="text"
                name="creator_name"
                id="creator_name"
                placeholder="i.e. Martha Cabrera"
                value={formData.creator_name}
                onChange={(e) => handleInputChange(null, "creator_name", e.target.name, e.target.value)} // Pass null for index
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="creator_nickname" className="block text-sm font-medium">Creator's Nickname</label>
              <input
                type="text"
                name="creator_nickname"
                id="creator_nickname"
                placeholder="i.e. Ama"
                value={formData.creator_nickname}
                onChange={(e) => handleInputChange(null, "creator_nickname", e.target.name, e.target.value)} // Pass null for index
                className="w-full p-2 border rounded"
              />
            </div>
            {/* <div className="mb-2">
              <label htmlFor="creator_photo" className="block text-sm font-medium">Creator's Photo (Optional)</label>
              <input
                type=""
                name="creator_photo"
                id="creator_photo"
                placeholder=""
                value={formData.creator_photo}
                onChange={(e) => setFormData(prevState => ({ ...prevState, creator_photo: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div> */}
            <div className="mb-2">
              <label htmlFor="creator_memory" className="block text-sm font-medium">Memory of the Creator</label>
              <textarea
                name="creator_memory"
                id="creator_memory"
                placeholder="Share a memory you have about a time you ate this recipe."
                value={formData.creator_memory}
                onChange={(e) => handleInputChange(null, "creator_memory", e.target.name, e.target.value)} // Pass null for index
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={nextStep} className="p-2 bg-blue-500 text-white rounded">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-2">
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="i.e. Pupusas Revueltas"
                value={formData.title}
                onChange={(e) => setFormData(prevState => ({ ...prevState, title: e.target.value }))}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="country" className="block text-sm font-medium">Country of Origin</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="i.e. El Salvador"
                value={formData.country}
                onChange={(e) => setFormData(prevState => ({ ...prevState, country: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="desc" className="block text-sm font-medium">Description</label>
              <textarea
                name="desc"
                id="desc"
                placeholder="i.e. savory stuffed corn tortillas are filled with a mixture of cheese, refried beans, and pork"
                value={formData.desc}
                onChange={(e) => setFormData(prevState => ({ ...prevState, desc: e.target.value }))}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div className="mb-2">
              <label htmlFor="visibility" className="block text-sm font-medium">Visibility</label>
              <select
                name="visibility"
                id="visibility"
                value={formData.visibility}
                onChange={(e) => {
                  if (e.target.value === "family" && !isInFamily) {
                    alert("You must be in a family to set visibility to 'family'.");
                  } else {
                    setFormData(prevState => ({ ...prevState, visibility: e.target.value }));
                  }
                }}
                className="w-full p-2 border rounded"
              >
                <option value="global">Global</option>
                <option value="family" disabled={!isInFamily}>Family</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded">Previous</button>
              <button type="button" onClick={nextStep} className="p-2 bg-blue-500 text-white rounded">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="mb-2">
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingredient Name"
                    value={ingredient.name}
                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                    required
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                    required
                    className="w-24 p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    value={ingredient.unit}
                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                    required
                    className="w-24 p-2 border rounded"
                  />
                </div>
                <div className="flex justify-between">
                  {index === formData.ingredients.length - 1 && (
                    <button type="button" onClick={() => handleAddInput("ingredients")} className="p-2 bg-green-500 text-white rounded">Add Ingredient</button>
                  )}
                  {index !== 0 && (
                    <button type="button" onClick={() => handleRemoveInput(index, "ingredients")} className="p-2 bg-red-500 text-white rounded">Remove Ingredient</button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded">Previous</button>
              <button type="button" onClick={nextStep} className="p-2 bg-blue-500 text-white rounded">Next</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            {formData.directions.map((direction, index) => (
              <div key={index} className="mb-2">
                <textarea
                  name="step"
                  placeholder={`Step ${index + 1}`}
                  value={direction.step}
                  onChange={(e) => handleInputChange(index, "directions", e.target.name, e.target.value)}
                  required
                  className="w-full p-2 border rounded mb-2"
                ></textarea>
                <div className="flex justify-between">
                  {index === formData.directions.length - 1 && (
                    <button type="button" onClick={() => handleAddInput("directions")} className="p-2 bg-green-500 text-white rounded">Add Direction</button>
                  )}
                  {index !== 0 && (
                    <button type="button" onClick={() => handleRemoveInput(index, "directions")} className="p-2 bg-red-500 text-white rounded">Remove Direction</button>
                  )}
                </div>
              </div>
            ))}
          <div className="flex justify-between"></div>
        <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded">Previous</button>
              <button type="submit" className="p-2 bg-blue-500 text-white rounded">Share Family Recipe!</button>
            </div>
        )}
      </form>
    </div>
  );
};

export default AddRecipe;
