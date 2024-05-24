import React, { useState, useEffect } from "react";
import AdminDashboard from "../AdminDashboard";
import axios from "axios";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
      setDeleteMessage("Movie deleted successfully");
      // Clear the delete message after 3 seconds
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white">All Movies</h2>
        {deleteMessage && (
          <div className="text-red-600 text-lg text-center mb-4">
            {deleteMessage}
          </div>
        )}
        <div className="overflow-x-auto text-white">
          <table className="table-auto w-full text-center mb-6">
            <thead>
              <tr className="bg-black">
                <th className="border py-2 px-4">Sr. No</th>
                <th className="border py-2 px-4">Title</th>
                <th className="border py-2 px-4">Category</th>
                <th className="border py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={movie._id} className="hover:bg-white hover:text-black hover:font-bold">
                  <td className="border py-2 px-4">{index + 1}</td>
                  <td className="border py-2 px-4">
                    <img
                      src={`http://localhost:5000${movie.image}`}
                      alt={movie.title}
                      className="w-10 h-10 mr-2 rounded-full"
                    />
                    {movie.title}
                  </td>
                  <td className="border py-2 px-4"> {movie.category}</td>
                  <td className="border py-2 px-4">
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllMovies;
