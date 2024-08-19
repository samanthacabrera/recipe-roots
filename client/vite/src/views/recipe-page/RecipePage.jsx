import React, { useEffect, useState } from 'react';
import Favorite from '../../components/Favorite';
import { useParams } from 'react-router-dom';

function RecipePage({ user }) {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe data');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDeleteRecipe = async () => {
        try {
            const response = await fetch(`/api/recipes/${id}?clerk_id=${user.clerk_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    if (!recipe) {
        return <div className="flex justify-center items-center h-screen">Recipe not found</div>;
    }

    return (
        <div id="recipePage" className="max-w-4xl mx-auto mt-12 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg space-y-12">
            {/* CreatorInfo */}
            <div id="creatorInfo" className="flex flex-col items-center text-center space-y-4">
                <h1 className="text-4xl font-bold">{recipe.creator_name}</h1>
                <img
                    src={recipe.creator_photo_public_id}
                    className="w-48 h-48 rounded-full object-cover"
                    alt={`${recipe.creator_name}'s photo`}
                />
                 <p className="w-1/2">{recipe.creator_bio}</p>
            </div>

            {/* RecipeInfo */}
            <div id="recipeInfo" className="bg-yellow-50 border border-gray-300 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold underline text-gray-700">{recipe.title}</h1>
                    <Favorite recipeId={recipe.id} userId={user.clerk_id}  />
                </div>

                <div className="mt-6 text-gray-700 space-y-4">
                    <p><strong>Country of Origin:</strong> {recipe.country}</p>
                    <p><strong>Description:</strong> {recipe.desc}</p>
                    <div>
                        <h6 className="font-semibold mb-2">Ingredients:</h6>
                        <ul className="list-disc pl-5 space-y-1">
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-semibold mb-2">Directions:</h6>
                        <ol className="list-decimal pl-5 space-y-2">
                            {recipe.directions.map((direction) => (
                                <li key={direction.id}>
                                    {direction.step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            <div id="editRecipe" className="flex justify-end">
                {user.clerk_id === recipe.user_clerk_id && (
                    <button
                        onClick={handleDeleteRecipe}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Delete Recipe
                    </button>
                )}
            </div>
        </div>
    );
}

export default RecipePage;
