

//AddMovie.jsx 

import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";

const AddMovie = () => {
  // State variables to store values of input fields
  const [title, setTitle] = useState("");
  const [linkOne, setLinkOne] = useState("");
  const [linkTwo, setLinkTwo] = useState("");
  const [linkThree, setLinkThree] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("Select Category");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle image upload
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddData = () => {
    // Create FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('linkOne', linkOne);
    formData.append('linkTwo', linkTwo);
    formData.append('linkThree', linkThree);
    formData.append('category', category);
    formData.append('image', image);

    // Send FormData in the fetch request
    fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      body: formData, // Use FormData instead of JSON.stringify
    })
      .then(response => {
        if (response.ok) {
          
          setSuccessMessage('Movie added successfully');
         
          setTitle("");
          setLinkOne("");
          setLinkTwo("");
          setLinkThree("");
          setImage(null);
          setCategory("Select Category");
        } else {
          throw new Error('Failed to add movie');
        }
      })
      .catch(error => {
        console.error('Error adding movie:', error);
        // Handle error
      });
  };


  return (
    <>
      <AdminDashboard />
      <div className="container mx-auto mt-8 px-4 mb-8 text-white font-bold">
        <h2 className="text-2xl font-semibold mb-8 text-center">Add Movie</h2>
        {/* Input fields */}
        <div className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Title :</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-white bg-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2">Upload Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="border border-white bg-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-500"
            />
          </div>
          {image && (
            <div className="mb-4">
              <img src={URL.createObjectURL(image)} alt="Uploaded" className="max-w-xs mx-auto" />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="director" className="block mb-2">480p Link :</label>
            <input
              type="text"
              id="director"
              value={linkOne}
              onChange={(e) => setLinkOne(e.target.value)}
              className="border border-white bg-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block mb-2">720p Link :</label>
            <input
              type="text"
              id="year"
              value={linkTwo}
              onChange={(e) => setLinkTwo(e.target.value)}
              className="border border-white bg-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block mb-2">1080p Link :</label>
            <input
              type="text"
              id="rating"
              value={linkThree}
              onChange={(e) => setLinkThree(e.target.value)}
              className="border border-white bg-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-white bg-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-gray-500"
            >
              <option value="Select Category">Select Category</option>
              <option value="Bollywood">Bollywood</option>
              <option value="Hollywood">Hollywood</option>
              <option value="South">South</option>
              <option value="Latest">Latest</option>
              <option value="Web Series">Web Series</option>
            </select>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
            {successMessage}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleAddData}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            ADD DATA
          </button>
        </div>

      </div>
    </>
  );
};

export default AddMovie;
