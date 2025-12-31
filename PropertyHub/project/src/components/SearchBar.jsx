import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, MapPin, Filter } from 'lucide-react';
import { setSearchQuery, setLocation, toggleFilterPanel } from '../store/slices/filtersSlice.js';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery, location } = useSelector(state => state.filters);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search properties, neighborhoods, or keywords..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Location (City, State, ZIP)"
            value={location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => dispatch(toggleFilterPanel())}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;