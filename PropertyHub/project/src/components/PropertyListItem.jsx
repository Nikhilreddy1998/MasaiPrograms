import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Bed, Bath, Square, MapPin, GitCompare, Calendar } from 'lucide-react';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice.js';
import { addToComparison, removeFromComparison } from '../store/slices/comparisonSlice.js';

const PropertyListItem = ({ property }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favorites);
  const { comparisonList } = useSelector(state => state.comparison);
  
  const isFavorite = favorites.includes(property.id);
  const isInComparison = comparisonList.includes(property.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromFavorites(property.id));
    } else {
      dispatch(addToFavorites(property.id));
    }
  };

  const handleComparisonClick = (e) => {
    e.preventDefault();
    if (isInComparison) {
      dispatch(removeFromComparison(property.id));
    } else {
      dispatch(addToComparison(property.id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/property/${property.id}`} className="block">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-80 h-48 sm:h-auto">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleComparisonClick}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  isInComparison ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600 hover:text-emerald-500'
                }`}
              >
                <GitCompare className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-600">${property.price.toLocaleString()}</span>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{new Date(property.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center text-gray-600">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.area} sq ft</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {property.amenities.slice(0, 4).map(amenity => (
                <span
                  key={amenity}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm line-clamp-2">{property.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyListItem;