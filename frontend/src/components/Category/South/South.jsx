import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SouthMovie = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await axios.get(`http://localhost:5000/api/search?term=${searchTerm}`);
        } else {
          response = await axios.get('http://localhost:5000/api/movies');
        }
        const data = response.data;
        // Filter movies based on the category (South)
        const southMovies = data.filter(movie => movie.category === 'South');
        setMovies(southMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const handleDownload = (downloadLink) => {
    window.open(downloadLink, '_blank');
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className="container mx-auto mt-12 overflow-x-hidden">
      <div className="mx-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {currentMovies.map((movie) => (
          <div
            key={movie._id}
            id={movie._id}
            className="bg-black rounded-xl shadow-md overflow-hidden border border-white"
          >
            <img
              className="h-48 w-full object-contain"
              src={`http://localhost:5000${movie.image}`}
              alt={movie.title}
            />
            <div className="p-4">
              <h2 className="block mt-1 text-lg leading-tight font-medium text-white hover:underline">
                {movie.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDownload(movie.linkOne)}
                >
                  480p
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDownload(movie.linkTwo)}
                >
                  720p
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDownload(movie.linkThree)}
                >
                  1080p
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {indexOfLastMovie < movies.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleNextPage}
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default SouthMovie;
