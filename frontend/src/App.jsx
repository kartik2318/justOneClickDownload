
// App.jsx

import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import LandingPage from "./components/Landing/LandingPage";
import Movies from "./Movies";
import LatestMovie from "./components/Category/Latest/Latest";
import BollywoodMovie from "./components/Category/Bollywood/Bollywood";
import SouthMovie from "./components/Category/South/South";
import HollywoodMovie from "./components/Category/Hollywood/Hollywood";
import AddMovie from "./components/Admin/addMovie/AddMovie";
import Users from "./components/Admin/users/Users";
import AllMovies from "./components/Admin/movies/AllMovies";
import WebSeries from "./components/Category/WebSeries/WebSeries";


function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="*" element={<PublicLayout onSearch={handleSearch} searchTerm={searchTerm} />} />


          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

function AdminLayout() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/add-movie" element={<AddMovie />} />
      <Route path="/users" element={<Users />} />
      <Route path="/all-movies" element={<AllMovies />} />
      <Route path="/" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
}

function PublicLayout({ onSearch, searchTerm }) {
  return (
    <>
      <Header onSearch={onSearch} />
      <LandingPage />
      <Routes>
        <Route path="/" element={<Movies searchTerm={searchTerm} />} />
        <Route path="/latest" element={<LatestMovie searchTerm={searchTerm} />} />
        <Route path="/bollywood" element={<BollywoodMovie searchTerm={searchTerm} />} />
        <Route path="/south" element={<SouthMovie searchTerm={searchTerm} />} />
        <Route path="/hollywood" element={<HollywoodMovie searchTerm={searchTerm} />} />
        <Route path="/web-series" element={<WebSeries searchTerm={searchTerm} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
