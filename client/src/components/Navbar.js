// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  console.log(user);
  

  return (
    <nav className="bg-gray-800 p-3">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Home</Link>
        </li>
        <li>
          {user ? (
            <>
              <button
                onClick={logout}
                className="text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white">Login / Register</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
