import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    { name: "Latest", path: "latest" },
    { name: "Bollywood", path: "bollywood" },
    { name: "South", path: "south" },
    { name: "Hollywood", path: "hollywood" },
    { name: "Web Series", path: "web-series" }, // Use 'web-series' instead of 'web series'
  ];

  return (
    <div className="mt-8 mx-4 sm:mx-8 flex flex-wrap justify-center sm:justify-between">
      {categories.map((category) => (
        <Link
          to={`/${category.path}`}
          key={category.name}
          onClick={() => handleCategoryChange(category.name)}
          className={`text-base px-4 py-2 m-1 transition duration-300 ease-in-out rounded ${
            selectedCategory === category.name
              ? "bg-yellow-400 text-black"
              : "bg-black text-yellow-400 border border-yellow-400"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default LandingPage;
