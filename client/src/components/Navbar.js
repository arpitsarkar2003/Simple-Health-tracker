import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Health Tracking App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add" className="text-white hover:text-blue-200">
              Add Record
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;