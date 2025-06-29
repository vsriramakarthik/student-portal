import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !event.target.closest('#user-menu')) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="text-xl font-bold text-indigo-700">Student Portal</Link>
          
          {user && (
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-student"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/add-student')
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Add Student
                </Link>
                <Link
                  to="/students"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/students')
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Students
                </Link>
              </div>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  id="user-menu"
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center focus:outline-none"
                >
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 border">
                    <div className="px-4 py-2 text-gray-700 font-semibold border-b">{user.username}</div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 