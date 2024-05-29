import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreatorInfo from './CreatorInfo';
import RecipeInfo from './RecipeInfo';
import EditRecipe from './EditRecipe';

function RecipePage({ user }) {
    const { id } = useParams(); 
    const navigate = useNavigate();
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


   const handleEditChange = (updatedFormData) => {
    setEditForm({
        ...editForm,
        ...updatedFormData,
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
            navigate('/');
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
            <CreatorInfo
                creatorPhoto={recipe.creator_photo}
                creatorName={recipe.creator_name}
                creatorNickname={recipe.creator_nickname}
                creatorBio={recipe.creator_bio}
                memory={recipe.memory}
                country={recipe.country}
            />
            <RecipeInfo
                title={recipe.title}
                description={recipe.desc}
                handleEdit={() => setIsEditing(true)}
                handleDelete={handleDelete}
                user={user}
                recipe={recipe}
            />
            {isEditing && (
                <EditRecipe
                    editForm={editForm}
                    onChange={handleEditChange}
                    handleEditSubmit={handleEditSubmit}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
}

export default RecipePage;


