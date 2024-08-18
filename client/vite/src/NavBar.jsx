import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, SignInButton, SignOutButton} from "@clerk/clerk-react";
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
        setIsMenuOpen((prevState) => !prevState);
    };

    const closeMenu = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50">
            <div className="flex justify-between items-center p-4">
                {/* Menu Toggle Button */}
                <button 
                    className="focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <svg className="hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar Menu */}
            <div 
                className={`fixed top-0 left-0 h-full overflow-y-scroll transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-50`} 
                ref={menuRef}
            >
                <div className="p-6 flex flex-col h-full">
                    
                    {/* Close Button */}
                    <button 
                        className="focus:outline-none self-start mb-4"
                        onClick={toggleMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    {/* RecipeRoots Link */}
                    <Link to="/" className="text-2xl mb-8">
                        Recipe<span className="text-olive-600">Roots</span>
                    </Link>

                    {/* User Buttons */}
                    <SignedOut>
                        <SignInButton className="mb-4 w-full text-center py-2 rounded-md hover:bg-olive-800 transition duration-300" />
                    </SignedOut>
                    <SignedIn>
                        <Link to="/" className="block px-4 py-2  rounded-md">Home</Link>
                        <Link to="/profile" className="block px-4 py-2 rounded-md">Profile</Link>
                        <Link to="/mission" className="block px-4 py-2 rounded-md">Mission</Link>
                        <SignOutButton className="mb-4 w-full text-center py-2 rounded-md hover:bg-olive-800 transition duration-300" />
                    </SignedIn>

                    {/* Search Input */}
                    <input 
                        type="text" 
                        placeholder="Search recipes" 
                        className="border border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:border-olive-600 transition-all duration-300"
                        value={searchQuery}
                        onChange={handleSearch}
                    />

                    {/* Filtered Recipes */}
                    <div className="mt-4 space-y-2">
                        {filteredRecipes.map((recipe) => (
                            <Link
                                key={recipe.id}
                                to={`/recipes/${recipe.id}`} 
                                className="btn-light block"
                            >
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
