import React, { useState, useEffect } from 'react';
import { countries, imperialUnits, metricUnits } from '/Users/samanthacabrera/FlatIron/phase-5/recipeRoots/client/vite/constants';

const RecipeForm = ({ initialData, onSubmit }) => {
    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [step, setStep] = useState(1);
    // const [isInFamily, setIsInFamily] = useState(false);
    const [formData, setFormData] = useState(initialData);
    // const [visibility, setVisibility] = useState('global');

    // useEffect(() => {
    //     const fetchFamilyStatus = async () => {
    //         try {
    //             const response = await fetch(`/api/family/status?clerk_id=${window.Clerk.user.id}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             });
    //             const data = await response.json();
    //             setIsInFamily(data.isInFamily);
    //         } catch (error) {
    //             console.error("Failed to fetch family status:", error.message);
    //         }
    //     };

    //     fetchFamilyStatus();
    // }, []);

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
            // visibility: visibility
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
         <form onSubmit={handleSubmit} className="w-screen h-screen bg-olive-600 text-slate-50 flex flex-col justify-center items-center">
            {step === 1 && (
                <div className="space-y-4 w-full max-w-lg px-8">
                    <div className="flex flex-col">
                        <label htmlFor="creator_name" className="text-4xl">Creator's Name</label>
                        <input
                            type="text"
                            name="creator_name"
                            id="creator_name"
                            placeholder="i.e. Martha Cabrera"
                            value={formData.creator_name || ""}
                            onChange={(e) => handleInputChange(null, "creator_name", e.target.name, e.target.value)}
                            required
                            className="p-3 bg-white rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="creator_photo" className="text-4xl">Creator's Photo (Optional)</label>
                        <input
                            type="file"
                            name="creator_photo"
                            id="creator_photo"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e.target.files[0])}
                            className="p-3 bg-white rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="memory" className="text-4xl">Memory</label>
                        <textarea
                            name="memory"
                            id="memory"
                            placeholder="Share a memory you have about a time you ate this recipe."
                            value={formData.memory || ""}
                            onChange={(e) => handleInputChange(null, "memory", e.target.name, e.target.value)}
                            className="p-3 bg-white rounded-md"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={nextStep} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Next</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 w-full max-w-lg px-8">
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-4xl">Recipe Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="i.e. Tres Leches Cake"
                            value={formData.title || ""}
                            onChange={(e) => handleInputChange(null, "title", e.target.name, e.target.value)}
                            required
                            className="p-3 bg-white rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="country" className="text-4xl">Country of Origin</label>
                        <select
                            name="country"
                            id="country"
                            value={formData.country || ""}
                            onChange={(e) => handleInputChange(null, "country", e.target.name, e.target.value)}
                            required
                            className="p-3 bg-white rounded-md"
                        >
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="desc" className="text-4xl">Recipe Description</label>
                        <textarea
                            name="desc"
                            id="desc"
                            placeholder="i.e. A rich, spongy cake soaked in three kinds of milk."
                            value={formData.desc || ""}
                            onChange={(e) => handleInputChange(null, "desc", e.target.name, e.target.value)}
                            required
                            className="p-3 bg-white rounded-md"
                        />
                    </div>
                    {/* <div className="flex flex-col">
                        <label htmlFor="visibility" className="text-4xl">Visibility</label>
                        <select
                            name="visibility"
                            id="visibility"
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="p-3 bg-white rounded-md"
                        >
                            <option value="global">Global</option>
                            <option value="family">Family</option>
                        </select>
                    </div> */}
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Previous</button>
                        <button type="button" onClick={nextStep} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Next</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4 w-full max-w-lg px-8">
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ingredient Name"
                                    value={ingredient.name || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-3 bg-white rounded-md"
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={ingredient.quantity || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-3 bg-white rounded-md"
                                />
                                <select
                                    name="unit"
                                    value={ingredient.unit || ""}
                                    onChange={(e) => handleInputChange(index, "ingredients", e.target.name, e.target.value)}
                                    required
                                    className="p-3 bg-white rounded-md"
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
                                    <button type="button" onClick={() => handleAddInput("ingredients")} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Add Ingredient</button>
                                )}
                                {index !== 0 && (
                                    <button type="button" onClick={() => handleRemoveInput(index, "ingredients")} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Remove Ingredient</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Previous</button>
                        <button type="button" onClick={nextStep} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Next</button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4 w-full max-w-lg px-8">
                    {formData.directions.map((direction, index) => (
                        <div key={index} className="space-y-2">
                            <textarea
                                name="step"
                                placeholder={`Step ${index + 1}`}
                                value={direction.step || ""}
                                onChange={(e) => handleInputChange(index, "directions", e.target.name, e.target.value)}
                                required
                                className="w-full p-3 bg-white rounded-md"
                            ></textarea>
                            <div className="flex justify-between">
                                {index === formData.directions.length - 1 && (
                                    <button type="button" onClick={() => handleAddInput("directions")} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Add Direction</button>
                                )}
                                {index !== 0 && (
                                    <button type="button" onClick={() => handleRemoveInput(index, "directions")} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Remove Direction</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <button type="button" onClick={prevStep} className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Previous</button>
                        <button type="submit" className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 focus:bg-gray-600">Share Family Recipe!</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default RecipeForm;



