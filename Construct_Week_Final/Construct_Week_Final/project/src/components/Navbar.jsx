import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, Heart, GitCompare, Menu, User, LogOut, Settings, Shield } from 'lucide-react';
import { logout } from '../store/slices/authSlice.js';
import AuthModal from './AuthModal.jsx';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favorites);
  const { comparisonList } = useSelector(state => state.comparison);
  const { currentUser, isAuthenticated } = useSelector(state => state.auth);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PropertyHub</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Properties
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    to="/favorites" 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      isActive('/favorites') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Favorites</span>
                    {favorites.length > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </Link>

                  <Link 
                    to="/compare" 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      isActive('/compare') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <GitCompare className="w-4 h-4" />
                    <span>Compare</span>
                    {comparisonList.length > 0 && (
                      <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {comparisonList.length}
                      </span>
                    )}
                  </Link>

                  {currentUser?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                        isActive('/admin') 
                          ? 'text-emerald-600 bg-emerald-50' 
                          : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  )}

                  {currentUser?.role === 'user' && (
                    <Link 
                      to="/dashboard" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                        isActive('/dashboard') 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {currentUser.name}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          currentUser.role === 'admin' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                        </span>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all text-sm font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;