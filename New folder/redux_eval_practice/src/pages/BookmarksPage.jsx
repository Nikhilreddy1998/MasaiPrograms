import React, { useState, useEffect } from 'react';
import { fetchBookmarksFromFirebase, removeBookmarkFromFirebase } from '../services/bookmarks';
import RatingBadge from '../components/RatingBadge';
import { BookmarkX, Bookmark, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const data = await fetchBookmarksFromFirebase();
        setBookmarks(data);
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
        setError('Failed to load your bookmarks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (bookmarkId) => {
    if (!bookmarkId) return;
    
    try {
      await removeBookmarkFromFirebase(bookmarkId);
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== bookmarkId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      setError('Failed to remove bookmark. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Bookmarked Establishments</h2>
        <p className="text-gray-600">
          Manage your saved food establishments.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{bookmark.name}</h3>
                  <RatingBadge rating={bookmark.ratingValue} />
                </div>

                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p>{bookmark.address}</p>
                  <p className="flex items-center">
                    <span className="font-medium">Local Authority:</span>
                    <span className="ml-1">{bookmark.localAuthorityName}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium">Rated:</span>
                    <span className="ml-1">
                      {new Date(bookmark.dateRated).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-3">
                <button
                  onClick={() => handleRemoveBookmark(bookmark.id)}
                  className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors duration-150"
                >
                  <Trash2 size={16} className="mr-1" />
                  Remove Bookmark
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No bookmarks yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            You haven't bookmarked any establishments yet. Browse establishments and click the Save button to bookmark them.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-150"
          >
            Browse Establishments
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;