import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import AddRecipe from './AddRecipe';

function Family({ user }) {
  const [isInFamily, setIsInFamily] = useState(false);
  const [familyData, setFamilyData] = useState(null);
  const [families, setFamilies] = useState([]);
  const [creatingFamily, setCreatingFamily] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('Fetching data for user:', user);
      fetchFamilyStatus();
      fetchAllFamilies();
    } else {
      console.log('No user data available');
    }
  }, [user]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const fetchFamilyStatus = async () => {
    console.log('Fetching family status');
    try {
      const response = await fetch(`/api/family/status?clerk_id=${user.clerk_id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Family status response:', data);
      setIsInFamily(data.isInFamily);
      if (data.isInFamily) {
        setFamilyData(data.familyData);
      }
    } catch (error) {
      console.error('Error fetching family status:', error);
      setIsInFamily(false);
    }
  };

  const fetchAllFamilies = async () => {
    console.log('Fetching all families');
    try {
      const response = await fetch('/api/families');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('All families response:', data);
      setFamilies(data);
    } catch (error) {
      console.error('Error fetching all families:', error);
    }
  };

  const handleCreateFamily = async () => {
    console.log('Creating family with name:', newFamilyName);
    try {
      const response = await fetch('/api/families', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFamilyName,
          moderator_id: user.clerk_id,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create family');
      }
      console.log('Family created successfully');
      fetchAllFamilies();
    } catch (error) {
      console.error('Error creating family:', error);
    } finally {
      setCreatingFamily(false);
      setNewFamilyName('');
    }
  };

  const toggleFamilyMembership = async (familyId) => {
    console.log(`Toggling family membership for family ID: ${familyId}`);
    try {
      const response = await fetch(`/api/family/membership/${familyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerk_id: user.clerk_id,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to toggle family membership');
      }
      console.log('Toggled family membership successfully');
      fetchFamilyStatus();
      fetchAllFamilies();
    } catch (error) {
      console.error('Error toggling family membership:', error);
    }
  };

  const familyRecipes = recipes.filter(
    (recipe) => recipe.visibility === 'family' && isInFamily && familyData && familyData.members.some(member => member.clerk_id === user.clerk_id)
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {isInFamily ? (
        <>
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Welcome to the {familyData ? familyData.name : '...'} Family Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            As a member of the {familyData ? familyData.name : '...'} family, you can access shared recipes uploaded by other members.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mb-2">Family Recipes:</h3>
          <div id="family-recipe-list" className="flex flex-row flex-wrap space-y-12">
            {familyRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} user={user} recipe={recipe} />
            ))}
          </div>
          
          <h3 className="text-2xl font-medium text-gray-700 mb-2">Family Members:</h3>
          <ul className="space-y-4">
            {familyData.members.map((member) => (
              <li key={member.clerk_id} >
                <span>{member.first_name} {member.last_name}</span>
              </li>
            ))}
          </ul>

          <AddRecipe />

          <button
            className="bg-red-400 text-white px-4 py-2 rounded shadow-sm hover:bg-red-500 transition-colors mt-4"
            onClick={() => toggleFamilyMembership(familyData.id)}
          >
            Leave Family
          </button>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">Welcome to the Family Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Joining a family allows you to upload recipes only members can view. Choose a family from the list below or create your own family group.
          </p>
          <div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">Browse list of all Families:</h3>
            <p className="text-gray-600 mb-4">
              Below is a list of all available family groups. You can join a family to start sharing recipes.
            </p>
            <ul className="space-y-4">
              {families.map((family) => (
                <li key={family.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
                  <span className="text-gray-800">{family.name}</span>
                  <button
                    className={`ml-4 px-4 py-2 rounded shadow-sm transition-colors ${
                      family.members.some((member) => member.clerk_id === user.clerk_id)
                        ? 'bg-red-400 text-white hover:bg-red-500'
                        : 'bg-blue-400 text-white hover:bg-blue-500'
                    }`}
                    onClick={() => toggleFamilyMembership(family.id)}
                  >
                    {family.members.some((member) => member.clerk_id === user.clerk_id) ? 'Leave Family' : 'Join Family'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-500 transition-colors"
              onClick={() => setCreatingFamily(true)}
            >
              Create a Family
            </button>
            {creatingFamily && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter family group name"
                  value={newFamilyName}
                  onChange={(e) => setNewFamilyName(e.target.value)}
                />
                <div className="space-x-2">
                  <button
                    className="bg-green-400 text-white px-4 py-2 rounded shadow-sm hover:bg-green-500 transition-colors"
                    onClick={handleCreateFamily}
                  >
                    Create
                  </button>
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded shadow-sm hover:bg-gray-500 transition-colors"
                    onClick={() => setCreatingFamily(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Family;

