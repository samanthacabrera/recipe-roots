import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeForm from './RecipeForm';

function RecipePage({ user }) {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

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

    const handleEditClick = () => {
        setEditMode(true);
    };


     const handleUpdateRecipe = async (updatedRecipe) => {
        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRecipe),
            });
            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }
            const data = await response.json();
            setRecipe(data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };



if (loading) {
    return <div>Loading...</div>;
}
if (!recipe) {
    return <div>Recipe not found</div>;
}

return (
        <>
            <section id="creatorInfo">
                <h1>Meet {recipe.creator_name}</h1>
                <h6>{recipe.creator_nickname}</h6>
                <h6>{recipe.creator_bio}</h6>
                <h6>{recipe.memory}</h6>
                <img src={recipe.creator_photo_public_id} className="translate-x-1/2 w-1/2" alt={`${recipe.creator_name}'s photo`} />
            </section>

            <section id="recipeInfo">
                <h1>{recipe.title}</h1>
                <h6>{recipe.country}</h6>
                <h6>{recipe.desc}</h6>
                <ul>
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </li>
                    ))}
                </ul>
                <ol>
                    {recipe.directions.map(direction => (
                        <li key={direction.id}>
                            {direction.step}
                        </li>
                    ))}
                </ol>
            </section>

            <section id="editRecipe">
            {user.clerk_id === recipe.user_clerk_id && !editMode && (
                <button onClick={handleEditClick}>Edit Recipe</button>
            )}

            {editMode && (
                <RecipeForm initialData={recipe} handleUpdateRecipe={handleUpdateRecipe} />
            )}
            </section>
        </>
    );
}

export default RecipePage;
