import React, { useState, useEffect } from 'react';
import { countries } from '../utils/constants.js';

const RecipeForm = ({ initialData, onSubmit }) => {
    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

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

    const handleAddIngredient = () => {
        setFormData(prevState => ({
            ...prevState,
            ingredients: [...formData.ingredients, { name: "", quantity: "", unit: "" }]
        }));
    };

    const handleRemoveIngredient = (index) => {
        const updatedData = formData.ingredients.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            ingredients: updatedData
        }));
    };

    const handleAddDirection = () => {
        setFormData(prevState => ({
            ...prevState,
            directions: [...formData.directions, { step: "" }]
        }));
    };

    const handleRemoveDirection = (index) => {
        const updatedData = formData.directions.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            directions: updatedData
        }));
    };

    const handlePhotoUpload = (file) => {
        console.log('Uploading photo to Cloudinary...');
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', 'blunavtc');

        fetch('https://api.cloudinary.com/v1_1/dqwkvvhaq/image/upload', {
            method: 'POST',
            body: uploadData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to upload photo');
            }
            return response.json();
        })
        .then(data => {
            console.log('Photo uploaded successfully:', data.url);
            setPhotoUrl(data.url);
            setPhoto(file);
        })
        .catch(error => {
            console.error('Error uploading photo:', error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const completeFormData = {
            ...formData,
            creator_photo_public_id: photoUrl,
            clerk_id: window.Clerk.user.id,
        };
        onSubmit(completeFormData);
    };
    
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <form id="recipeForm" onSubmit={handleSubmit} className="w-screen h-screen flex flex-col justify-center items-center">
            {step === 1 && (
                <div className="space-y-4 w-full max-w-lg px-8">
                    <p>We're excited to help you preserve and share your family recipes. Please click "Start" to begin.</p>
                    <div className="flex justify-end">
                        <button type="button" onClick={nextStep} className="btn">Start</button>
                    </div> 
                </div>
            )}
            {step === 2 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <div className="flex flex-col space-y-2">
                        <h3 className="text-4xl">Let's get started!</h3>
                        <h6 className="pb-4">First, tell us about a little about who created this recipe.</h6>
                        <label htmlFor="creator_name">Recipe Creator's Name:</label>
                        <input
                            type="text"
                            name="creator_name"
                            id="creator_name"
                            placeholder="i.e. Martha Cabrera"
                            value={formData.creator_name || ""}
                            onChange={(e) => handleInputChange(null, "creator_name", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="creator_photo">Recipe Creator's Photo: </label>
                        <input
                            type="file"
                            name="creator_photo"
                            id="creator_photo"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e.target.files[0])}
                            className="p-2 bg-white rounded-md focus:outline-white"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="memory">Recipe Memory: <span className="text-xs block">(Share the story of how this recipe was first made or your favorite memory eating this recipe.)</span></label>
                        <textarea
                            name="memory"
                            id="memory"
                            placeholder="i.e. My family and I would make this every Christmas Eve."
                            value={formData.memory || ""}
                            onChange={(e) => handleInputChange(null, "memory", e.target.name, e.target.value)}
                            className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="btn">Previous</button>
                        <button type="button" onClick={nextStep} className="btn">Next</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <div className="flex flex-col space-y-2">
                        <p className="text-4xl pb-4">Now, let's add the basics of your recipe.</p>
                        <label htmlFor="title">Recipe Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="i.e. Tres Leches Cake"
                            value={formData.title || ""}
                            onChange={(e) => handleInputChange(null, "title", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="country">Country of Origin:</label>
                        <select
                            name="country"
                            id="country"
                            value={formData.country || ""}
                            onChange={(e) => handleInputChange(null, "country", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                        >
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="desc">Recipe Description:</label>
                        <textarea
                            name="desc"
                            id="desc"
                            placeholder="i.e. A rich, spongy cake soaked in three kinds of milk."
                            value={formData.desc || ""}
                            onChange={(e) => handleInputChange(null, "desc", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="btn">Previous</button>
                        <button type="button" onClick={nextStep} className="btn">Next</button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <h6 className="text-4xl pb-4">Now, let's add the ingredients</h6>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="border p-4 rounded-md mb-4">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor={`ingredient-name-${index}`}>Ingredient Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id={`ingredient-name-${index}`}
                                    placeholder="i.e. Sugar"
                                    value={ingredient.name || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                                />
                                <label htmlFor={`ingredient-quantity-${index}`}>Quantity:</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    id={`ingredient-quantity-${index}`}
                                    placeholder="i.e. 1 cup"
                                    value={ingredient.quantity || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                                />
                                <label htmlFor={`ingredient-unit-${index}`}>Unit:</label>
                                <input
                                    type="text"
                                    name="unit"
                                    id={`ingredient-unit-${index}`}
                                    placeholder="i.e. cups"
                                    value={ingredient.unit || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-2 bg-white rounded-md text-gray-500 focus:outline-white"
                                />
                            </div>
                            <button type="button" onClick={() => handleRemoveIngredient(index)} className="text-red-500 mt-2">Remove</button>
                        </div>
                    ))}
                    <div className="flex flex-col space-y-2">
                        <button type="button" onClick={handleAddIngredient} className="btn-light">Add Ingredient</button>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="btn">Previous</button>
                        <button type="button" onClick={nextStep} className="btn">Next</button>
                    </div>
                </div>
            )}

            {step === 5 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <h6 className="text-4xl pb-4">Now, add step-by-step directions for making the recipe.</h6>
                    {formData.directions.map((direction, index) => (
                        <div key={index} className="border p-4 rounded-md mb-4">
                            <label htmlFor={`direction-step-${index}`} className="">Step {index + 1}</label>
                            <textarea
                                name="step"
                                placeholder="Describe this step."
                                value={direction.step || ""}
                                onChange={(e) => handleInputChange(index, "directions", e.target.name, e.target.value)}
                                required
                                className="w-full p-3 bg-white rounded-md text-gray-500 focus:outline-white"
                            ></textarea>
                            <button type="button" onClick={() => handleRemoveDirection(index)} className="text-red-500">Remove</button>
                        </div>
                    ))}
                    <div className="flex flex-col space-y-2">
                        <button type="button" onClick={handleAddDirection} className="btn-light">Add Direction</button>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="btn">Previous</button>
                        <button type="submit" className="btn">Share Family Recipe!</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default RecipeForm;
