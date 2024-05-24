import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    if (!showSearchInput) {
      setSearchTerm(""); // Clear search term when showing input field
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        onSearch(searchTerm);
      } catch (error) {
        console.error("Error searching for movies:", error);
      }
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="bg-black text-white py-6 px-6 flex items-center justify-between overflow-x-hidden">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fd/K_Letter_LZNQBD.jpg"
              alt="Logo"
              className="h-12 mr-2"
            />
          </Link>
        </div>
        <div className="flex-grow text-center">
          {showSearchInput ? (
            <input
              type="text"
              placeholder="Search"
              className={`py-2 px-4 rounded-full bg-zinc-900 text-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out ${
                windowWidth <= 325 ? "w-32" : "w-58"
              }`} // Conditionally set the width of the input field
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <h1 className="text-2xl font-bold">Just One Click Download</h1> 
          )}
        </div>
        <div className="relative">
          <div className="flex items-center">
            <IoSearch
              className="h-6 w-6 text-gray-400 cursor-pointer ml-2"
              onClick={toggleSearchInput}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
