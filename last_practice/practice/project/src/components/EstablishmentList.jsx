import React from 'react';
import EstablishmentCard from './EstablishmentCard';
import { isEstablishmentBookmarked } from '../services/bookmarks';

function EstablishmentList({ establishments, bookmarks, onBookmark, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 p-3">
              <div className="flex justify-between">
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (establishments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No establishments found</h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {establishments.map((establishment) => (
        <EstablishmentCard
          key={establishment.FHRSID}
          establishment={establishment}
          onBookmark={onBookmark}
          isBookmarked={isEstablishmentBookmarked(establishment, bookmarks)}
        />
      ))}
    </div>
  );
}

export default EstablishmentList;