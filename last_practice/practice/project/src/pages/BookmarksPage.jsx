import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarksAsync, removeBookmarkAsync, selectBookmarks } from '../store/slices/bookmarksSlice';
import { Bookmark, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function BookmarksPage() {
  const dispatch = useDispatch();
  const bookmarks = useSelector(selectBookmarks);

  useEffect(() => {
    dispatch(fetchBookmarksAsync());
  }, [dispatch]);

  if (!bookmarks.length) {
    return (
      <div className="text-center py-8">
        <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">No bookmarks yet</p>
        <Link to="/" className="text-green-600 hover:text-green-800 mt-4 inline-block">
          Browse Establishments
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Your Bookmarks</h2>
      {bookmarks.map(bookmark => (
        <div key={bookmark.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{bookmark.name}</h3>
            <p className="text-gray-600 text-sm">{bookmark.address}</p>
          </div>
          <button
            onClick={() => dispatch(removeBookmarkAsync(bookmark.id))}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookmarksPage;