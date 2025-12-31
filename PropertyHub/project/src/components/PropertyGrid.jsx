import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, List, Map, ArrowUpDown } from 'lucide-react';
import PropertyCard from './PropertyCard.jsx';
import PropertyListItem from './PropertyListItem.jsx';
import PropertyMap from './PropertyMap.jsx';
import { setViewMode, setSortBy, setFilteredProperties } from '../store/slices/propertiesSlice.js';
import { applyFilters } from '../utils/filterUtils.js';

const PropertyGrid = () => {
  const dispatch = useDispatch();
  const { filteredProperties, viewMode, sortBy, isLoading } = useSelector(state => state.properties);
  const { allProperties } = useSelector(state => state.properties);
  const filters = useSelector(state => state.filters);

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = applyFilters(allProperties, filters);
    dispatch(setFilteredProperties(filtered));
  }, [filters, allProperties, dispatch]);

  const handleSortChange = (newSortBy) => {
    dispatch(setSortBy(newSortBy));
  };

  const handleViewModeChange = (newViewMode) => {
    dispatch(setViewMode(newViewMode));
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-medium">{filteredProperties.length}</span>
          <span>properties found</span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewModeChange('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewModeChange('map')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'map' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredProperties.map(property => (
                <PropertyListItem key={property.id} property={property} />
              ))}
            </div>
          )}

          {viewMode === 'map' && (
            <PropertyMap properties={filteredProperties} />
          )}
        </>
      )}
    </div>
  );
};

export default PropertyGrid;