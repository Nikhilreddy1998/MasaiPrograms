import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Bed, Bath, Square, MapPin, GitCompare } from 'lucide-react';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice.js';
import { addToComparison, removeFromComparison } from '../store/slices/comparisonSlice.js';

const PropertyCard = ({ property }) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden property-card-hover">
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-48 object-cover"
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

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{property.title}</h3>
            <span className="text-xl font-bold text-blue-600">${property.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600 mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.area} sq ft</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map(amenity => (
              <span
                key={amenity}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;