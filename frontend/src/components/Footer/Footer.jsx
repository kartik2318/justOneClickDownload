import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail(""); // Clear the input field after successful subscription

      // Change button styling to "Subscribed" for 3 seconds
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <footer className="border-t border-gray-700 text-white py-6 mt-8 px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fd/K_Letter_LZNQBD.jpg"
          alt="Logo"
          className="h-12 w-12 text-lg"
        />
        <div className="flex flex-row space-x-4">
          <Link to="/more-info" className="hover:underline text-md">More Info</Link>
          <Link to="/send-query" className="hover:underline text-md">Send Query</Link>
          <Link to="/contact" className="hover:underline text-md">Contact</Link>
        </div>
      </div>

      <div className="mt-4 lg:mt-0 w-full lg:w-auto text-center">
        <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-full bg-black text-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out w-full sm:w-auto"
          />
          <button
            onClick={handleSubscribe}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm:ml-2 w-full sm:w-auto ${
              subscribed ? "bg-green-500 hover:bg-green-700" : ""
            }`}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        {message && <p className="mt-2 text-sm text-gray-400">{message}</p>}
      </div>
    </footer>
  );
};

export default Footer;
