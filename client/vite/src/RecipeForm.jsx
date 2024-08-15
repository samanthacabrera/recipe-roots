import React, { useState, useEffect } from 'react';
import { countries, imperialUnits, metricUnits } from './constants.js';

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
         <form onSubmit={handleSubmit} className="w-screen h-screen bg-olive-600 flex flex-col justify-center items-center">
            {step === 1 && (
                <div className="space-y-4 w-full max-w-lg px-8">
                    <p>We're excited to help you preserve and share your family recipes. Please click "Next" to begin.</p>
                    <div className="flex justify-end">
                        <button type="button" onClick={nextStep} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Next</button>
                    </div> 
                </div>
            )}
            {step === 2 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <div className="flex flex-col space-y-2">
                        <h3 className="text-4xl">Let's get started!</h3>
                        <h6 className="text-xl pb-4">First, tell us about alittle about who created this recipe.</h6>
                        <label htmlFor="creator_name" className="">Recipe creator's Name</label>
                        <input
                            type="text"
                            name="creator_name"
                            id="creator_name"
                            placeholder="i.e. Martha Cabrera"
                            value={formData.creator_name || ""}
                            onChange={(e) => handleInputChange(null, "creator_name", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md focus:outline-white"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="creator_photo" className="">Recipe creator's Photo</label>
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
                        <label htmlFor="memory" className="">Share a special memory you have about this recipe</label>
                        <textarea
                            name="memory"
                            id="memory"
                            placeholder="My family and I would eat this every year around the holidays."
                            value={formData.memory || ""}
                            onChange={(e) => handleInputChange(null, "memory", e.target.name, e.target.value)}
                            className="p-2 bg-white rounded-md focus:outline-white"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="">Previous</button>
                        <button type="button" onClick={nextStep} className="">Next</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <div className="flex flex-col space-y-2">
                        <p className="text-4xl pb-4">Now, let's add the basics of your recipe.</p>
                        <label htmlFor="title" className="">Recipe Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="i.e. Tres Leches Cake"
                            value={formData.title || ""}
                            onChange={(e) => handleInputChange(null, "title", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md focus:outline-white"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="country" className="">Country of Origin</label>
                        <select
                            name="country"
                            id="country"
                            value={formData.country || ""}
                            onChange={(e) => handleInputChange(null, "country", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md focus:outline-white"
                        >
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="desc" className="">Recipe Description</label>
                        <textarea
                            name="desc"
                            id="desc"
                            placeholder="i.e. A rich, spongy cake soaked in three kinds of milk."
                            value={formData.desc || ""}
                            onChange={(e) => handleInputChange(null, "desc", e.target.name, e.target.value)}
                            required
                            className="p-2 bg-white rounded-md focus:outline-white"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="">Previous</button>
                        <button type="button" onClick={nextStep} className="">Next</button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <h6 className="text-4xl pb-4">Next, let's add the ingredients</h6>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} >
                            <div className="flex flex-col space-y-2">
                                <label htmlFor={`ingredient-name-${index}`} className="">Ingredient Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="i.e. Sugar"
                                    value={ingredient.name || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-2 bg-white rounded-md focus:outline-white"
                                />
                                <label htmlFor={`ingredient-quantity-${index}`} className="">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="i.e. 1"
                                    value={ingredient.quantity || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-2 bg-white rounded-md focus:outline-white"
                                />
                                <label htmlFor={`ingredient-unit-${index}`} className="">Unit</label>
                                <select
                                    name="unit"
                                    value={ingredient.unit || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-2 bg-white rounded-md focus:outline-white"
                                >
                                    <option value="">Select Unit</option>
                                    {imperialUnits.map((unit, index) => (
                                        <option key={index} value={unit}>{unit}</option>
                                    ))}
                                    {metricUnits.map((unit, index) => (
                                        <option key={index} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between">
                                {index === formData.ingredients.length - 1 && (
                                    <button type="button" onClick={() => handleAddInput("ingredients")} className="">Add Ingredient</button>
                                )}
                                {index !== 0 && (
                                    <button type="button" onClick={() => handleRemoveInput(index, "ingredients")} className="">Remove Ingredient</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="">Previous</button>
                        <button type="button" onClick={nextStep} className="">Next</button>
                    </div>
                </div>
            )}

            {step === 5 && (
                <div className="space-y-4 w-full max-w-lg px-8 text-left">
                    <h6 className="text-4xl pb-4">Now, add step-by-step directions for making the recipe.</h6>
                    {formData.directions.map((direction, index) => (
                        <div key={index} className="space-y-2">
                            <label htmlFor={`direction-step-${index}`} className="">Step {index + 1}</label>
                            <textarea
                                name="step"
                                placeholder="Describe this step."
                                value={direction.step || ""}
                                onChange={(e) => handleInputChange(index, "directions", e.target.name, e.target.value)}
                                required
                                className="w-full p-3 bg-white rounded-md"
                            ></textarea>
                            <div className="flex justify-between">
                                {index === formData.directions.length - 1 && (
                                    <button type="button" onClick={() => handleAddInput("directions")} className="">Add Direction</button>
                                )}
                                {index !== 0 && (
                                    <button type="button" onClick={() => handleRemoveInput(index, "directions")} className="">Remove Direction</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="">Previous</button>
                        <button type="submit" className="">Share Family Recipe!</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default RecipeForm;
