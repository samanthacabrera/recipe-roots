import React from "react";

function Footer() {
    return (
        <footer className="flex justify-between text-xs m-4 opacity-40">
            <a href="https://github.com/samanthacabrera/recipe-roots" target="_blank" className="hover:scale-110 transition duration-300">contribute</a>
            <a href="/" className="hover:scale-110 transition duration-300">privacy</a>
        </footer>
    )
}

export default Footer;