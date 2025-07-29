import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); 
  const [username, setUsername] = useState('');
  const dropdownRef = useRef(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); 
        setUsername(decoded.username || 'User');
      } catch {
        setUsername('User');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate('/LoginPage');
  };

  const handleChangePassword = () => {
    setShowDropdown(false);
    navigate('/change-password'); 
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-[7vh] flex items-center justify-between border-b px-6 bg-white shadow-md z-50 relative">
      {/* Left Links */}
      <div className="flex space-x-8 text-2xl font-bold text-black">
        <Link to="/Movies" className="flex items-center">
          <FontAwesomeIcon icon={faClapperboard} size="xl" />
        </Link>
        <Link to="/Home" className="hover:text-gray-700">Home</Link>
        <Link to="/Movies" className="hover:text-gray-700">Movies</Link>
        <Link to="/Watchlist" className="hover:text-gray-700">Watchlist</Link>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <FontAwesomeIcon
          icon={faUserCircle}
          size="2x"
          className="cursor-pointer text-gray-700 hover:text-black"
          onClick={() => setShowDropdown((prev) => !prev)}
        />

        {showDropdown && (
          <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]">
            <div className="px-4 py-2 font-semibold text-gray-700 border-b">
              {`Hi, ${username || 'User'}`}
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left font-bold px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
