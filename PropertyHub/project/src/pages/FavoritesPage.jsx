import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import PropertyCard from '../components/PropertyCard.jsx';
import { clearFavorites } from '../store/slices/favoritesSlice.js';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favorites);
  const { allProperties } = useSelector(state => state.properties);

  const favoriteProperties = allProperties.filter(property => 
    favorites.includes(property.id)
  );

  useEffect(() => {
    document.title = 'My Favorites - PropertyHub';
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  if (favoriteProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Favorites Yet</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Start browsing properties and save your favorites to see them here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">
              You have saved {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
          {favoriteProperties.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Back to Browse */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;