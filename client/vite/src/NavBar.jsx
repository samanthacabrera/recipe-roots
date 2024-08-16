import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

function NavBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

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

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const closeMenu = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside the menu
        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-black bg-opacity-5">
            <div className="flex justify-between items-center p-3">
                {/* Logo */}
                <Link to="/" className="nav-link text-xl">
                    Recipe<span className="text-olive-600 inline-block hover:rotate-6 hover:-translate-y-1 transition duration-300 ease-in-out">Roots</span>
                </Link>

                {/* Menu Toggle Button */}
                <button 
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full bg-white shadow-md transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-1/4 z-50`} ref={menuRef}>
                <div className="p-4 flex flex-col h-full">
                    <button 
                        className="text-gray-500 hover:text-gray-700 focus:outline-none self-end mb-4"
                        onClick={toggleMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    {/* User Buttons */}
                    <SignedOut>
                        <SignInButton className="mb-4" />
                    </SignedOut>
                    <SignedIn>
                        {/* <UserButton className="mb-4" /> */}
                        <Link to="/" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Home</Link>
                        <Link to="/profile" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Cookbook</Link>
                        <Link to="/mission" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Mission</Link>
                    </SignedIn>


                    {/* Search Input */}
                    <input 
                        type="text" 
                        placeholder="Search recipes" 
                        className="border border-gray-300 rounded-md px-2 py-1 mb-4 focus:outline-none focus:border-green-800 transition-all duration-300"
                        value={searchQuery}
                        onChange={handleSearch}
                    />

                    {/* Filtered Recipes */}
                    <div className="mb-4">
                        {filteredRecipes.map(recipe => (
                            <Link
                                key={recipe.id}
                                to={`/recipes/${recipe.id}`} 
                                className="block p-2 mb-2 rounded-full bg-olive-700 text-white w-full text-center">
                                {recipe.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
