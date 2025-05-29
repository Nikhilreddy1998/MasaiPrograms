import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Building, Bookmark, BookmarkCheck } from 'lucide-react';
import RatingBadge from './RatingBadge';
import { formatAddress } from '../services/bookmarks';

function EstablishmentCard({ establishment, onBookmark, isBookmarked }) {
  const formattedDate = new Date(establishment.RatingDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            <Link 
              to={`/establishment/${establishment.FHRSID}`}
              className="hover:text-green-600 transition-colors duration-150"
            >
              {establishment.BusinessName}
            </Link>
          </h3>
          <RatingBadge rating={establishment.RatingValue} />
        </div>
        
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex items-start">
            <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
            <span className="line-clamp-2">
              {formatAddress(establishment)}
            </span>
          </div>
          
          <div className="flex items-center">
            <Building size={16} className="mr-2 flex-shrink-0 text-gray-400" />
            <span className="line-clamp-1">{establishment.LocalAuthorityName}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 flex-shrink-0 text-gray-400" />
            <span>Rated: {formattedDate}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 bg-gray-50 p-3">
        <div className="flex justify-between items-center">
          <Link 
            to={`/establishment/${establishment.FHRSID}`}
            className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors duration-150"
          >
            View Details
          </Link>
          
          <button
            onClick={() => onBookmark(establishment)}
            disabled={isBookmarked}
            className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
              isBookmarked 
                ? 'bg-gray-100 text-gray-500 cursor-default' 
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
            aria-label={isBookmarked ? 'Already bookmarked' : 'Bookmark this establishment'}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck size={16} className="mr-1" />
                Saved
              </>
            ) : (
              <>
                <Bookmark size={16} className="mr-1" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstablishmentCard;