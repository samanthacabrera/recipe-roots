import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

function NavBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === '') {
            setFilteredRecipes([]);
            return;
        }

        try {
            const response = await fetch(`/api/search_recipes?search_query=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setFilteredRecipes([]);
        }
    };

    return (
        <nav className="top-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
            <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                        <Link to="/" className="text-lg text-gray-800 hover:text-gray-600 transition-colors">Global</Link>
                        <Link to="/family" className="text-lg text-gray-800 hover:text-gray-600 transition-colors">Family</Link>
                        <Link to="/profile" className="text-lg text-gray-800 hover:text-gray-600 transition-colors">Cookbook</Link>
                        <Link to="/mission" className="text-lg text-gray-800 hover:text-gray-600 transition-colors">Our Mission</Link>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </SignedIn>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                {filteredRecipes.map(recipe => (
                    <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="block text-lg text-gray-800 hover:text-gray-600 transition-colors">
                        {recipe.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;
