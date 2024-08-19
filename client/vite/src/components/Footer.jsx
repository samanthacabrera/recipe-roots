import React from "react";

function Footer() {
    return (
        <footer className="flex justify-between text-xs m-4">
            <a href="https://github.com/samanthacabrera/recipe-roots" target="_blank" className="hover:scale-110 transition duration-300">contribute</a>
            <a href="/" className="hover:scale-125 transition duration-100">privacy</a>
        </footer>
    )
}

export default Footer;