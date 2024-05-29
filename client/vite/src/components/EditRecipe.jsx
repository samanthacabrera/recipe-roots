// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import { countries, imperialUnits } from "/Users/samanthacabrera/FlatIron/phase-5/recipeRoots/client/vite/constants";

// function EditRecipe() {
//     const { id } = useParams(); 
//     const [step, setStep] = useState(1);
//     const [isInFamily, setIsInFamily] = useState(false);
//     const [isEditing, setIsEditing] = useState(false); 
//     const [recipe, setRecipe] = useState(null); 
//     const [isLoading, setIsLoading] = useState(true);
//     const [formData, setFormData] = useState({
//         creator_name: "",
//         creator_nickname: "",
//         creator_photo_public_id: "",
//         memory: "",
//         title: "",
//         country: "",
//         desc: "",
//         visibility: "global",
//         ingredients: [{ name: "", quantity: "", unit: "" }],
//         directions: [{ step: "" }]
//     });

//     useEffect(() => {
//     const fetchRecipe = async () => {
//         try {

//             const response = await fetch(`/api/recipes/${id}`);
//             console.log("Response:", response);
//             const data = await response.json();
//             console.log("Recipe data:", data);
//             setRecipe(data.recipe);
//             setIsInFamily(data.isInFamily);
//             setIsEditing(data.recipe.creator_id === window.Clerk.user.id); 
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Failed to fetch recipe:", error.message);
//         }
//     };

//     fetchRecipe();
// }, [id]);


//     const handleInputChange = (index, type, name, value) => {
//         if (Array.isArray(formData[type])) {
//             const updatedData = formData[type].map((item, i) => {
//                 if (i === index) {
//                     return { ...item, [name]: value };
//                 }
//                 return item;
//             });
//             setFormData(prevState => ({
//                 ...prevState,
//                 [type]: updatedData
//             }));
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [type]: value
//             }));
//         }
//     };

//     const handleAddInput = (type) => {
//         setFormData(prevState => ({
//             ...prevState,
//             [type]: [...formData[type], type === "ingredients" ? { name: "", quantity: "", unit: "" } : { step: "" }]
//         }));
//     };

//     const handleRemoveInput = (index, type) => {
//         const updatedData = formData[type].filter((_, i) => i !== index);
//         setFormData(prevState => ({
//             ...prevState,
//             [type]: updatedData
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`/api/recipe/${recipe.id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     ...formData,
//                     clerk_id: window.Clerk.user.id
//                 })
//             });
//             if (response.ok) {
//                 alert("Recipe successfully updated!!");
//                 // Reset form data and step if needed
//                 setFormData({
//                     creator_name: "",
//                     creator_nickname: "",
//                     creator_photo_public_id: "",
//                     memory: "",
//                     title: "",
//                     country: "",
//                     desc: "",
//                     visibility: "global",
//                     ingredients: [{ name: "", quantity: "", unit: "" }],
//                     directions: [{ step: "" }]
//                 });
//                 setStep(1);
//             } else {
//                 alert("Failed to update recipe");
//             }
//         } catch (error) {
//             console.error("Failed to update recipe:", error.message);
//         }
//     };

//     const nextStep = () => {
//         setStep(step + 1);
//     };

//     const prevStep = () => {
//         setStep(step - 1);
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!isEditing) {
//         return <div>You are not authorized to edit this recipe.</div>;
//     }
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { countries, imperialUnits } from "/Users/samanthacabrera/FlatIron/phase-5/recipeRoots/client/vite/constants";

function EditRecipe({user}) {
    const { id } = useParams(); 
    const [step, setStep] = useState(1);
    const [isInFamily, setIsInFamily] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [recipe, setRecipe] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
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
    });

useEffect(() => {
const fetchRecipe = () => {
    fetch(`/api/recipes/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch recipe: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data:", data);
            setRecipe(data.recipe);
            setIsInFamily(data.isInFamily);
            const currentUserId = window.Clerk.user.id;
            console.log("Current User ID:", currentUserId);
            const isAuthorized = data.recipe && data.recipe.creator_id === currentUserId;
            console.log("Is Authorized:", isAuthorized);
            setIsEditing(isAuthorized);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Failed to fetch recipe:", error.message);
        });
};

    fetchRecipe();
}, [id]);


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
            const response = await fetch(`/api/recipe/${recipe.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    clerk_id: window.Clerk.user.id
                })
            });
            if (response.ok) {
                alert("Recipe successfully updated!!");
                // Reset form data and step if needed
                setFormData({
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
                });
                setStep(1);
            } else {
                alert("Failed to update recipe");
            }
        } catch (error) {
            console.error("Failed to update recipe:", error.message);
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

if (isLoading) {
    return <div>Loading...</div>;
}

if (!isEditing) {
    return <div>You are not authorized to edit this recipe.</div>;
}

    return (
        <div>
            {/* Step 1 */}
            {step === 1 && (
                <div>
                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange(null, "title", e.target.name, e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>

                    {/* Country */}
                    <div className="mb-4">
                        <label htmlFor="country" className="block font-medium mb-1">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange(null, "country", e.target.name, e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        >
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="desc" className="block font-medium mb-1">Description</label>
                        <textarea
                            id="desc"
                            name="desc"
                            value={formData.desc}
                            onChange={(e) => handleInputChange(null, "desc", e.target.name, e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>

                    {/* Visibility */}
                    <div className="mb-4">
                        <label htmlFor="visibility" className="block font-medium mb-1">Visibility</label>
                        <select
                            id="visibility"
                            name="visibility"
                            value={formData.visibility}
                            onChange={(e) => handleInputChange(null, "visibility", e.target.name, e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        >
                            <option value="global">Global</option>
                            <option value="family">Family</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Next</button>
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div>
                    {/* Ingredients */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Ingredients</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex mb-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={ingredient.name}
                                    onChange={(e) => handleInputChange(index, "ingredients", "name", e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-1/2 mr-2"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleInputChange(index, "ingredients", "quantity", e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-1/4 mr-2"
                                    required
                                />
                                <select
                                    value={ingredient.unit}
                                    onChange={(e) => handleInputChange(index, "ingredients", "unit", e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-1/4"
                                    required
                                >
                                    <option value="">Select unit</option>
                                    {/* You can use either imperialUnits or metricUnits based on your preference */}
                                    {imperialUnits.map((unit, index) => (
                                        <option key={index} value={unit}>{unit}</option>
                                    ))}
                                </select>
                                <button type="button" onClick={() => handleRemoveInput(index, "ingredients")} className="bg-red-500 text-white px-2 py-1 rounded ml-2">-</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddInput("ingredients")} className="bg-green-500 text-white px-4 py-2 rounded">Add Ingredient</button>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
                        <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
                <div>
                    {/* Directions */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Directions</label>
                        {formData.directions.map((direction, index) => (
                            <div key={index} className="flex mb-2">
                                <input
                                    type="text"
                                    placeholder={`Step ${index + 1}`}
                                    value={direction.step}
                                    onChange={(e) => handleInputChange(index, "directions", "step", e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                    required
                                />
                                <button type="button" onClick={() => handleRemoveInput(index, "directions")} className="bg-red-500 text-white px-2 py-1 rounded ml-2">-</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddInput("directions")} className="bg-green-500 text-white px-4 py-2 rounded">Add Step</button>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
                        <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default EditRecipe

