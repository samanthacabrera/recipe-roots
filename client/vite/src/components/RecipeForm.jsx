import React, { useState, useEffect } from 'react';
import { countries, imperialUnits, metricUnits } from '/Users/samanthacabrera/FlatIron/phase-5/recipeRoots/client/vite/constants';

const RecipeForm = ({ initialData, onSubmit }) => {
    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [step, setStep] = useState(1);
    const [isInFamily, setIsInFamily] = useState(false);
    const [formData, setFormData] = useState(initialData);

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     onSubmit({ ...formData, creator_photo_public_id: photoUrl });
    // };
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
        <div className="bg-white shadow-lg rounded-lg max-w-2xl mx-auto p-24">
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
                                value={formData.creator_name || ""}
                                onChange={(e) => handleInputChange(null, "creator_name", e.target.name, e.target.value)} 
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
                                value={formData.creator_nickname || ""}
                                onChange={(e) => handleInputChange(null, "creator_nickname", e.target.name, e.target.value)} 
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="creator_photo" className="block text-sm font-medium">Creator's Photo (Optional)</label>
                            <input
                                type="file"
                                name="creator_photo"
                                id="creator_photo"
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(e.target.files[0])}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="memory" className="block text-sm font-medium">Memory</label>
                            <textarea
                                name="memory"
                                id="memory"
                                placeholder="Share a memory you have about a time you ate this recipe."
                                value={formData.memory || ""}
                                onChange={(e) => handleInputChange(null, "memory", e.target.name, e.target.value)} 
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
                            <label htmlFor="title" className="block text-sm font-medium">Recipe Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="i.e. Tres Leches Cake"
                                value={formData.title || ""}
                                onChange={(e) => handleInputChange(null, "title", e.target.name, e.target.value)} 
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="country" className="block text-sm font-medium">Country of Origin</label>
                            <select
                                name="country"
                                id="country"
                                value={formData.country || ""}
                                onChange={(e) => handleInputChange(null, "country", e.target.name, e.target.value)} 
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select a country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="desc" className="block text-sm font-medium">Recipe Description</label>
                            <textarea
                                name="desc"
                                id="desc"
                                placeholder="i.e. A rich, spongy cake soaked in three kinds of milk."
                                value={formData.desc || ""}
                                onChange={(e) => handleInputChange(null, "desc", e.target.name, e.target.value)} 
                                required
                                className="w-full p-2 border rounded"
                            ></textarea>
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
                                        value={ingredient.name || ""}
                                        onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                        required
                                        className="flex-1 p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        value={ingredient.quantity || ""}
                                        onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                        required
                                        className="w-24 p-2 border rounded"
                                    />
                                    <select
                                        name="unit"
                                        value={ingredient.unit || ""}
                                        onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                        required
                                        className="w-24 p-2 border rounded"
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
                                    value={direction.step || ""}
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
                        <div className="flex justify-between">
                            <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded">Previous</button>
                            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Share Family Recipe!</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RecipeForm;
