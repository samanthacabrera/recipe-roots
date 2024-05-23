import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipePage({ user }) {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    useEffect(() => {
        if (recipe) {
            setEditForm({
                title: recipe.title,
                desc: recipe.desc,
                creator_name: recipe.creator_name,
                creator_nickname: recipe.creator_nickname,
                creator_bio: recipe.creator_bio,
                creator_photo: recipe.creator_photo,
                memory: recipe.memory,
                country: recipe.country,
                visibility: recipe.visibility,
            });
        }
    }, [recipe]);

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...editForm, clerk_id: user.clerk_id }),
            });
            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }
            const data = await response.json();
            setRecipe(data.recipe);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clerk_id: user.clerk_id }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            // Redirect to another page or update UI
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className="container mx-auto py-8">
            {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={editForm.title}
                                onChange={handleEditChange}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full"
                                placeholder="Title"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="desc" className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea
                                name="desc"
                                id="desc"
                                value={editForm.desc}
                                onChange={handleEditChange}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full"
                                placeholder="Description"
                            />
                        </div>
                        {/* Add other input fields for the rest of the recipe attributes */}
                        <div className="mb-4">
                            <label htmlFor="visibility" className="block text-gray-700 font-bold mb-2">Visibility</label>
                            <select
                                name="visibility"
                                id="visibility"
                                value={editForm.visibility}
                                onChange={handleEditChange}
                                className="border border-gray-400 rounded-md px-4 py-2 w-full"
                            >
                                <option value="global">Global</option>
                                <option value="family">Family</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
                            <a href="#recipe-core" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                                Jump to Recipe
                            </a>
                        </div>
                        <p className="text-gray-800 mb-4">{recipe.desc}</p>
                        <h2 className="text-xl font-bold mb-2">About the Creator</h2>
                        {recipe.creator_photo && (
                            <img src={recipe.creator_photo} alt={`${recipe.creator_name}'s photo`} className="mb-2 rounded-full" />
                        )}
                        <p className="mb-1"><strong>Name:</strong> {recipe.creator_name}</p>
                        <p className="mb-1"><strong>Nickname:</strong> {recipe.creator_nickname}</p>
                        <p className="mb-1"><strong>Bio:</strong> {recipe.creator_bio}</p>
                        <p className="mb-1"><strong>Memory:</strong> {recipe.memory}</p>
                        <p className="mb-4"><strong>Country:</strong> {recipe.country}</p>
                    </div>

                    <div id="recipe-core" className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-bold mb-2">Recipe Details</h2>
                        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
                        <ul className="list-disc pl-6 mb-4">
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                            ))}
                        </ul>

                        <h2 className="text-xl font-bold mb-2">Directions</h2>
                        <ol className="list-decimal pl-6 mb-4">
                            {recipe.directions.sort((a, b) => a.order - b.order).map((direction) => (
                                <li key={direction.id}>{direction.step}</li>
                            ))}
                        </ol>

                        <h2 className="text-xl font-bold mb-2">Additional Information</h2>
                        <p><strong>Visibility:</strong> {recipe.visibility}</p>
                    </div>
                    <div>
                        {recipe.user_clerk_id === user.clerk_id && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <button onClick={() => setIsEditing(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">Edit Recipe</button>
                                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Recipe</button>
                            </div>
                        )}
                    </div>
                </>)
            }
        </div>
    )
}

export default RecipePage;
