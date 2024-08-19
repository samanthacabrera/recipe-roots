import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="sticky top-0 z-50">
            <div className="flex justify-between items-center p-4">
             
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
                className={`fixed top-0 left-0 h-full overflow-y-scroll rounded-lg border-r border-slate-300 border-opacity-50 shadow-lg text-left transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-50 bg-[rgb(50,65,49)]`} 
                ref={menuRef}
            >
                <div className="p-6 flex flex-col h-full">
                    
                 
                    <button 
                        className="focus:outline-none self-start mb-4"
                        onClick={toggleMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <SignedOut>
                        <div className="flex flex-col space-y-2 mx-4 text-lg"> 
                            <Link to="/" onClick={scrollToTop} className="">Recipe <span className="text-olive-600">Roots</span></Link>
                            <Link to="/profile" onClick={scrollToTop} className="">Profile</Link>
                            <Link to="/mission" onClick={scrollToTop} className="">Mission</Link>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex flex-col space-y-2 mx-4 text-lg">
                        <Link to="/" onClick={scrollToTop} className="">Recipe <span className="text-olive-600">Roots</span></Link>
                        <Link to="/profile" onClick={scrollToTop} className="">Profile</Link>
                        <Link to="/mission" onClick={scrollToTop} className="">Mission</Link>
                        <SignOutButton className="text-left" />
                        </div>
                    </SignedIn>

                    {/* Search Input */}
                    <input 
                        type="text" 
                        placeholder="Search recipes" 
                        className="border-top border-b bg-transparent py-1 m-4 focus:outline-none"
                        value={searchQuery}
                        onChange={handleSearch}
                    />

                    {/* Filtered Recipes */}
                    <div className="m-4 space-y-2">
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
