import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to home page after logout
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">Your Logo</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Home</Link>
              {user.username && (
                <>
                <Link to="/public" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">All Blogs</Link>
                <Link to="/blog" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">My Blogs</Link>
                <Link to="/profile" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Profile</Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            {user.username ? (
              <>
                <span className="py-2 px-2 font-medium text-gray-500">Welcome, {user.username}</span>
                <button onClick={handleLogout} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-red-500 hover:text-white transition duration-300">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
                <Link to="/register" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;