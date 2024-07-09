import React, { useEffect, useState } from 'react';
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
            console.log("Deleting recipe with ID:", id);
            console.log("User clerk_id:", user.clerk_id);
            
            const response = await fetch(`/api/recipes/${id}?clerk_id=${user.clerk_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log("Delete recipe response:", response);

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const getPinterestShareUrl = () => {
        const url = window.location.href;
        const description = recipe ? recipe.title : '';
        return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`;
    };

    const getFacebookShareUrl = () => {
        const url = window.location.href;
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4 mt-12">
            <div id="creatorInfo" className="space-y-12 p-4">
                <h1 className="text-2xl underline mb-6">Meet {recipe.creator_name}</h1>
                <h6 className="px-24">{recipe.creator_bio}</h6>
                <img
                    src={recipe.creator_photo_public_id}
                    className="w-full translate-x-1/2 rounded-lg"
                    alt={`${recipe.creator_name}'s photo`}
                    style={{ maxWidth: 'calc(50% - 20px)' }}
                />
            </div>

            <div id="recipeInfo" className="text-justify p-4">
                <h1 className="text-2xl underline mb-6">{recipe.title}</h1>
                <h6 className="font-semibold mb-4">Country of Origin: <span className="font-normal"> {recipe.country}</span></h6>
                <h6 className="font-semibold mb-4">Description: <span className="font-normal"> {recipe.desc}</span></h6>
                <h6 className="font-semibold mb-4">Ingredients:</h6>
                <ul className="space-y-1">
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </li>
                    ))}
                </ul>
            
                <h6 className="font-semibold my-4">Directions:</h6>
                <ol className="space-y-2">
                    {recipe.directions.map(direction => (
                        <li key={direction.id}>
                            {direction.step}
                        </li>
                    ))}
                </ol>
            </div>

            <section id="editRecipe" className="p-4">
                {user.clerk_id === recipe.user_clerk_id && (
                    <button onClick={handleDeleteRecipe}>Delete Recipe</button> 
                )}
            </section>

            <section id="socialSharing" className="p-4 text-left">
                <h6 className="font-semibold mb-4">Share this recipe:</h6>
                <a
                    href={getPinterestShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                >
                    <button>Pinterest</button>
                </a>
                <a
                    href={getFacebookShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                >
                    <button>Facebook</button>
                </a>
            </section>
        </div>
    );
}

export default RecipePage;
