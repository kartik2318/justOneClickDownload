// AdminDashboard.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <div className="w-full flex justify-between">
        <h1 className="text-4xl font-bold text-white text-center w-full">Admin Dashboard</h1>
        <div className="relative">
          <button
            className="flex items-center justify-center text-black text-lg font-bold bg-white border border-gray-300 rounded-full px-4 py-2 transition duration-300 ease-in-out focus:outline-none"
            onClick={toggleDropdown}
          >
             <FontAwesomeIcon icon={faUser} className="mr-2" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="text-black font-bold absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md">
              <Link
                to="/admin/add-movie"
                className="block py-2 px-4 hover:bg-gray-100 transition duration-300 ease-in-out"
                onClick={toggleDropdown}
              >
                Add Movie
              </Link>
              <Link
                to="/admin/users"
                className="block py-2 px-4 hover:bg-gray-100 transition duration-300 ease-in-out"
                onClick={toggleDropdown}
              >
                Users
              </Link>
              <Link
                to="/admin/all-movies"
                className="block py-2 px-4 hover:bg-gray-100 transition duration-300 ease-in-out"
                onClick={toggleDropdown}
              >
                All Movies
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-max">
        {/* These links are moved into the dropdown menu */}
      </div>
    </div>
  );
};

export default AdminDashboard;
