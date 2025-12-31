import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GitCompare, X, Bed, Bath, Square, MapPin, ExternalLink, Trash2 } from 'lucide-react';
import { removeFromComparison, clearComparison } from '../store/slices/comparisonSlice.js';

const ComparisonPage = () => {
  const dispatch = useDispatch();
  const { comparisonList } = useSelector(state => state.comparison);
  const { allProperties } = useSelector(state => state.properties);

  const comparisonProperties = allProperties.filter(property => 
    comparisonList.includes(property.id)
  );

  useEffect(() => {
    document.title = 'Property Comparison - PropertyHub';
  }, []);

  const handleRemoveProperty = (propertyId) => {
    dispatch(removeFromComparison(propertyId));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all comparisons?')) {
      dispatch(clearComparison());
    }
  };

  if (comparisonProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GitCompare className="w-12 h-12 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Properties to Compare</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Add properties to your comparison list to see how they stack up against each other.
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

  const compareFields = [
    { key: 'price', label: 'Price', format: (value) => `$${value.toLocaleString()}` },
    { key: 'bedrooms', label: 'Bedrooms', format: (value) => value },
    { key: 'bathrooms', label: 'Bathrooms', format: (value) => value },
    { key: 'area', label: 'Area (sq ft)', format: (value) => value.toLocaleString() },
    { key: 'type', label: 'Property Type', format: (value) => value.charAt(0).toUpperCase() + value.slice(1) },
    { key: 'location', label: 'Location', format: (value) => value },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Comparison</h1>
            <p className="text-gray-600">
              Comparing {comparisonProperties.length} {comparisonProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
          {comparisonProperties.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-48">
                    Property Details
                  </th>
                  {comparisonProperties.map(property => (
                    <th key={property.id} className="px-6 py-4 text-center min-w-80">
                      <div className="relative">
                        <button
                          onClick={() => handleRemoveProperty(property.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                        <div className="flex items-center justify-center text-gray-600 text-sm mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{property.location}</span>
                        </div>
                        <Link
                          to={`/property/${property.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {compareFields.map((field, index) => (
                  <tr key={field.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {field.label}
                    </td>
                    {comparisonProperties.map(property => (
                      <td key={property.id} className="px-6 py-4 text-center text-sm text-gray-700">
                        {field.format(property[field.key])}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Amenities Row */}
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Amenities
                  </td>
                  {comparisonProperties.map(property => (
                    <td key={property.id} className="px-6 py-4 text-center">
                      <div className="space-y-1">
                        {property.amenities.slice(0, 3).map(amenity => (
                          <span
                            key={amenity}
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{property.amenities.length - 3} more
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Quick Stats Row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Quick Stats
                  </td>
                  {comparisonProperties.map(property => (
                    <td key={property.id} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Bed className="w-3 h-3 mr-1" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-3 h-3 mr-1" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-3 h-3 mr-1" />
                          <span>{property.area}</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Add More Properties */}
        {comparisonProperties.length < 3 && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              You can compare up to 3 properties. Add more to get a better comparison.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Add More Properties
            </Link>
          </div>
        )}

        {/* Back to Browse */}
        <div className="text-center mt-8">
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

export default ComparisonPage;