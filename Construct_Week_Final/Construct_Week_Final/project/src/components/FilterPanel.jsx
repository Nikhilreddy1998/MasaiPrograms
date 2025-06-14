import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, RotateCcw } from 'lucide-react';
import {
  toggleFilterPanel,
  setPropertyType,
  setPriceRange,
  setBedrooms,
  setBathrooms,
  setAmenities,
  resetFilters
} from '../store/slices/filtersSlice.js';
import { amenitiesList } from '../data/mockData.js';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const {
    isFilterPanelOpen,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    amenities
  } = useSelector(state => state.filters);

  const handleAmenityToggle = (amenity) => {
    const newAmenities = amenities.includes(amenity)
      ? amenities.filter(a => a !== amenity)
      : [...amenities, amenity];
    dispatch(setAmenities(newAmenities));
  };

  if (!isFilterPanelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch(toggleFilterPanel())} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch(resetFilters())}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => dispatch(toggleFilterPanel())}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Property Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['all', 'apartment', 'house', 'condo'].map(type => (
                <button
                  key={type}
                  onClick={() => dispatch(setPropertyType(type))}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    propertyType === type
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="5000000"
                step="50000"
                value={priceRange[1]}
                onChange={(e) => dispatch(setPriceRange([priceRange[0], parseInt(e.target.value)]))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Bedrooms</label>
            <div className="grid grid-cols-3 gap-2">
              {['any', '1', '2', '3', '4', '5+'].map(bed => (
                <button
                  key={bed}
                  onClick={() => dispatch(setBedrooms(bed))}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    bedrooms === bed
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Bathrooms</label>
            <div className="grid grid-cols-3 gap-2">
              {['any', '1', '2', '3', '4+'].map(bath => (
                <button
                  key={bath}
                  onClick={() => dispatch(setBathrooms(bath))}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    bathrooms === bath
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {bath}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Amenities</label>
            <div className="space-y-2">
              {amenitiesList.map(amenity => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;