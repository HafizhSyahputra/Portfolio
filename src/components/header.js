import React, { useState, useCallback, useEffect } from "react";
import logo from "../assets/img/HP.png";
import "./header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const scrollToSection = useCallback((id) => {
    if (id === "aboutme") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      console.log("Scrolling to:", id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element dengan id "${id}" tidak ditemukan.`);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`bg-custom p-10 pl-32 pr-32 fixed top-0 left-0 right-0 z-10 ${hasShadow ? 'shadow' : ''}`}>
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
              className="h-7 w-7"
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
      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
  <button
    onClick={handleToggle} 
    type="button"
    className="absolute top-10 right-10 text-gray-300 hover:text-white focus:outline-none"
  >
    <svg
      className="h-7 w-7"
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
  <div className="px-2 pt-5 space-y-2">
    <button
      onClick={() => {
        scrollToSection("aboutme");
        handleToggle(); 
      }}
      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      About Me
    </button>
    <button
      onClick={() => {
        scrollToSection("portfolio");
        handleToggle(); 
      }}
      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      Portfolio
    </button>
    <button
      onClick={() => {
        scrollToSection("contact");
        handleToggle(); 
      }}
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
