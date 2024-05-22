import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

function NavBar() {
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
                        {/* <Link to="/about" className="text-lg text-gray-800 hover:text-gray-600 transition-colors">Our Story</Link> */}
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
