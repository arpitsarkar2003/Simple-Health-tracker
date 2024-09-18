import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { user, logout } = useAuth();
  const router = useNavigate();

  const handleLogout = () => {
    logout();
    router('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Health Tracker
        </Link>
        <div className="flex items-center">
          <Link to="/" className="text-white mr-4">
            Home
          </Link>
          <div className="relative">
            <button
              onClick={() => setShowUserInfo(!showUserInfo)}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            {showUserInfo && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <div className="px-4 py-2 text-sm text-gray-700">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;