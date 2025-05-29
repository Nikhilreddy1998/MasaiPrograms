import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectEstablishments } from '../store/slices/establishmentsSlice';
import { addBookmarkAsync, selectBookmarks } from '../store/slices/bookmarksSlice';
import { ArrowLeft, MapPin, Calendar, Bookmark, BookmarkCheck } from 'lucide-react';

function EstablishmentDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const establishment = useSelector(selectEstablishments).find(est => est.FHRSID.toString() === id);
  const bookmarks = useSelector(selectBookmarks);
  const isBookmarked = bookmarks.some(b => b.name === establishment?.BusinessName);

  if (!establishment) {
    return (
      <div className="text-center py-8">
        <Link to="/" className="text-green-600 hover:text-green-800">
          <ArrowLeft className="inline mr-2" />Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Link to="/" className="text-green-600 hover:text-green-800 mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />Back
      </Link>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">{establishment.BusinessName}</h1>
        <button
          onClick={() => !isBookmarked && dispatch(addBookmarkAsync(establishment))}
          className={`p-2 rounded-full ${isBookmarked ? 'text-gray-400' : 'text-green-600 hover:bg-green-50'}`}
          disabled={isBookmarked}
        >
          {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
        </button>
      </div>
      <div className="space-y-4">
        <p className="flex items-center">
          <MapPin className="mr-2" size={18} />
          {establishment.AddressLine1}, {establishment.PostCode}
        </p>
        <p className="flex items-center">
          <Calendar className="mr-2" size={18} />
          Rated: {new Date(establishment.RatingDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default EstablishmentDetailPage;