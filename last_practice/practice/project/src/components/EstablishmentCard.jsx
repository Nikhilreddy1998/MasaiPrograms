import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck } from 'lucide-react';

function EstablishmentCard({ establishment, isBookmarked, onBookmark }) {
  const ratingClass = establishment.RatingValue === '5' 
    ? 'bg-green-100 text-green-800' 
    : establishment.RatingValue >= '3' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <Link 
            to={`/establishment/${establishment.FHRSID}`}
            className="font-semibold text-lg hover:text-green-600"
          >
            {establishment.BusinessName}
          </Link>
          <p className="text-gray-600 text-sm mt-1">
            {establishment.AddressLine1}, {establishment.PostCode}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${ratingClass}`}>
            Rating: {establishment.RatingValue}
          </span>
          <button 
            onClick={() => onBookmark(establishment)}
            disabled={isBookmarked}
            className="p-1 hover:text-green-600 disabled:opacity-50"
          >
            {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstablishmentCard