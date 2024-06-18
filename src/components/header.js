import React, { useState, useCallback } from "react";
import logo from "../assets/img/HP.png"; 
import "./header.css"; 

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    console.log("Scrolling to:", id); 
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element dengan id "${id}" tidak ditemukan.`);
    }
  }, []);

  return (
    <nav className="bg-custom p-10 pl-32 pr-32">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-6 w-8" />
        </div>
        <div className="hidden md:flex space-x-20">
          <button
            className="text-gray-300 hover:text-yellow-400 cursor-pointer"
            onClick={() => scrollToSection("aboutme")}
          >
            About Me
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-gray-300 hover:text-yellow-400 cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-300 hover:text-yellow-400 cursor-pointer"
          >
            Contact
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={handleToggle}
            type="button"
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden dropdown-menu ${isOpen ? 'open' : ''}`}>
        <div className="px-2 pt-5 space-y-2">
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
