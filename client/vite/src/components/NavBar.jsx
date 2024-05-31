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
        <nav className="top-0 w-full bg-none border-b border-gray-200 shadow-sm z-50">
            <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>

                    <SignedIn>
                        <h1 className="text-lg font-light text-gray-800">Recipe<span className="text-olive-600">Roots</span></h1>
                        <Link to="/" className="nav-link">Global</Link>
                        <Link to="/profile" className="nav-link">Cookbook</Link>
                        <Link to="/mission" className="nav-link">Our Mission</Link>
                    </SignedIn>
                </div>
                
                <div className="flex items-center space-x-4">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 transition-all duration-300"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                {filteredRecipes.map(recipe => (
                    <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="block text-lg font-light text-gray-800 hover:text-gray-600 transition-colors">
                        {recipe.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;
