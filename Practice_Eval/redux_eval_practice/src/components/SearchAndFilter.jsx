import React from 'react';
import { Search, Filter } from 'lucide-react';

function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  ratingFilter,
  setRatingFilter,
  localAuthorityFilter,
  setLocalAuthorityFilter,
  localAuthorities,
}) {
  const ratingOptions = ['0', '1', '2', '3', '4', '5', 'Awaiting Inspection', 'Exempt'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all duration-300">
      <div className="space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by business name or postcode"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 
                      bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 
                      focus:border-green-500 transition duration-150 ease-in-out sm:text-sm"
          />
        </div>

        <div className="md:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 
                        bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 
                        transition duration-150 ease-in-out sm:text-sm"
            >
              <option value="">All Ratings</option>
              {ratingOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:w-64">
          <select
            value={localAuthorityFilter}
            onChange={(e) => setLocalAuthorityFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 
                      bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 
                      transition duration-150 ease-in-out sm:text-sm"
          >
            <option value="">All Local Authorities</option>
            {localAuthorities.map(authority => (
              <option key={authority} value={authority}>{authority}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;