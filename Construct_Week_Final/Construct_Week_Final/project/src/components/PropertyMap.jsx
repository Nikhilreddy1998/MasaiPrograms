import React, { useState } from 'react';
import { MapPin, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyMap = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7505, lng: -73.9934 });

  // Simple map simulation - in a real app, you'd use Google Maps or Mapbox
  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setMapCenter(property.coordinates);
  };

  return (
    <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Interactive Map View</p>
          <p className="text-gray-500 text-sm mt-2">Click on property markers to view details</p>
        </div>
      </div>

      {/* Property Markers */}
      <div className="absolute inset-0">
        {properties.map((property, index) => (
          <button
            key={property.id}
            onClick={() => handleMarkerClick(property)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 map-marker"
            style={{
              left: `${20 + (index % 5) * 15}%`,
              top: `${30 + Math.floor(index / 5) * 20}%`
            }}
          >
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
              <span className="text-xs font-bold">${Math.round(property.price / 1000)}K</span>
            </div>
          </button>
        ))}
      </div>

      {/* Property Details Popup */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm mx-auto">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{selectedProperty.title}</h3>
              <p className="text-sm text-gray-600">{selectedProperty.location}</p>
            </div>
            <button
              onClick={() => setSelectedProperty(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-blue-600">
              ${selectedProperty.price.toLocaleString()}
            </span>
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <span>{selectedProperty.bedrooms} beds</span>
              <span>{selectedProperty.bathrooms} baths</span>
              <span>{selectedProperty.area} sq ft</span>
            </div>
          </div>

          <Link
            to={`/property/${selectedProperty.id}`}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <span>View Details</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;