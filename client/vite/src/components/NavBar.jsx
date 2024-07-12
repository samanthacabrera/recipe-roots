// import React, { useState } from 'react';
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// import { Link } from 'react-router-dom';

// function NavBar() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredRecipes, setFilteredRecipes] = useState([]);

//     const handleSearch = async (e) => {
//         const query = e.target.value;
//         setSearchQuery(query);

//         if (query === '') {
//             setFilteredRecipes([]);
//             return;
//         }

//         try {
//             const response = await fetch(`/api/search_recipes?search_query=${query}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setFilteredRecipes(data);
//         } catch (error) {
//             console.error('Error fetching recipes:', error);
//             setFilteredRecipes([]);
//         }
//     };

//     return (
//         <nav className="sticky top-0 z-50 shadow ">
//             <div className="flex justify-between items-center p-4 bg-white">
//                 <div className="space-x-6" >
//                     <SignedOut>
//                         <Link to="/" className="nav-link">Recipe<span className="text-olive-600 inline-block hover:rotate-6 hover:-translate-y-1 transition duration-300 ease-in-out">Roots</span></Link>
//                         <SignInButton />
//                     </SignedOut>

//                     <SignedIn>
//                         <Link to="/" className="nav-link">Recipe<span className="text-olive-600 inline-block hover:rotate-6 hover:-translate-y-1 transition duration-300 ease-in-out">Roots</span></Link>
//                         <Link to="/stories" className="nav-link">Stories</Link>
//                         {/* <Link to="/community" className="nav-link">Community</Link> */}
//                         <Link to="/profile" className="nav-link">Cookbook</Link>
//                         <Link to="/mission" className="nav-link">Mission</Link>
//                     </SignedIn>
//                 </div>
                
//                 <div className="flex items-center space-x-4">
//                     <input 
//                         type="text" 
//                         placeholder="Search recipes" 
//                         className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-green-800 transition-all duration-300"
//                         value={searchQuery}
//                         onChange={handleSearch}
//                     />
//                     <SignedIn>
//                         <UserButton/>
//                     </SignedIn>
//                 </div>
//             </div>

//             <div className="bg-white">
//                 {filteredRecipes.map(recipe => (
//                     <Link
//                         key={recipe.id}
//                         to={`/recipes/${recipe.id}`} 
//                         className="text-centerblock p-2 m-2 rounded-full bg-olive-600 text-white w-fit">
//                         {recipe.title}
//                     </Link>
//                 ))}
//             </div>
//         </nav>
//     );
// }

// export default NavBar;

import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

function NavBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 shadow bg-white">
            <div className="flex justify-between items-center p-4">
                <button onClick={toggleMenu} className="block lg:hidden">
                    <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <Link to="/" className="nav-link">Recipe<span className="text-olive-600 inline-block hover:rotate-6 hover:-translate-y-1 transition duration-300 ease-in-out">Roots</span></Link>

                <div className="hidden lg:flex items-center space-x-4">
                    <input 
                        type="text" 
                        placeholder="Search recipes" 
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-green-800 transition-all duration-300"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </div>

            {/* Collapsible menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white absolute top-16 left-0 right-0 z-50 shadow">
                    <div className="py-2 px-4">
                        <SignedOut>
                            <div>
                                <Link to="/" className="block py-2 text-gray-800">Home</Link>
                                <SignInButton className="block py-2 text-gray-800" />
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div>
                                <Link to="/" className="block py-2 text-gray-800">Home</Link>
                                <Link to="/stories" className="block py-2 text-gray-800">Stories</Link>
                                {/* <Link to="/community" className="block py-2 text-gray-800">Community</Link> */}
                                <Link to="/profile" className="block py-2 text-gray-800">Cookbook</Link>
                                <Link to="/mission" className="block py-2 text-gray-800">Mission</Link>
                            </div>
                        </SignedIn>
                    </div>
                    <div className="py-2 px-4">
                        <input 
                            type="text" 
                            placeholder="Search recipes" 
                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-green-800 transition-all duration-300 block lg:hidden"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    {/* Search results with pill-like styling */}
                    {filteredRecipes.length > 0 && (
                        <div className="bg-white">
                            <div className="py-2 px-4 flex flex-wrap">
                                {filteredRecipes.map(recipe => (
                                    <Link
                                        key={recipe.id}
                                        to={`/recipes/${recipe.id}`} 
                                        className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2 hover:bg-gray-200 transition duration-300"
                                    >
                                        {recipe.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default NavBar;
