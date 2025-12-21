import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Star, 
  Calendar,
  User as UserIcon,
  Plus,
  Minus,
  X,
  Heart,
  Share2,
  MessageCircle
} from 'lucide-react';
import { setSearchTerm, setSelectedGenre, setSelectedBook, borrowBook as borrowBookAction, addReview, addToWishlist } from '../store/slices/booksSlice';
import { borrowBook } from '../store/slices/borrowingSlice';
import { addNotification } from '../store/slices/notificationsSlice';

const BookCatalog = () => {
  const dispatch = useDispatch();
  const { books, searchTerm, selectedGenre, selectedBook } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingBook, setReviewingBook] = useState(null);
  const [yearFilter, setYearFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Get unique genres and years
  const genres = [...new Set(books.map(book => book.genre))];
  const years = [...new Set(books.map(book => book.publishedYear))].sort((a, b) => b - a);

  // Filter and sort books
  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !selectedGenre || book.genre === selectedGenre;
      const matchesYear = !yearFilter || book.publishedYear.toString() === yearFilter;
      const matchesRating = !ratingFilter || book.rating >= parseFloat(ratingFilter);
      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.publishedYear - a.publishedYear;
        case 'popularity':
          return (b.reviews?.length || 0) - (a.reviews?.length || 0);
        default:
          return 0;
      }
    });

  const handleBorrowBook = (book) => {
    if (book.available) {
      dispatch(borrowBookAction(book.id));
      dispatch(borrowBook({
        userId: user.id,
        bookId: book.id,
        bookTitle: book.title
      }));
      dispatch(addNotification({
        type: 'success',
        title: 'Book Borrowed',
        message: `You have successfully borrowed "${book.title}"`
      }));
    }
  };

  const handleAddToWishlist = (book) => {
    dispatch(addToWishlist({ userId: user.id, bookId: book.id }));
    dispatch(addNotification({
      type: 'info',
      title: 'Added to Wishlist',
      message: `"${book.title}" has been added to your wishlist`
    }));
  };

  const handleShareBook = (book) => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Check out "${book.title}" by ${book.author} - ${window.location.href}`);
      dispatch(addNotification({
        type: 'success',
        title: 'Link Copied',
        message: 'Book link copied to clipboard'
      }));
    }
  };

  const ReviewModal = ({ book, onClose }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const review = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        rating,
        comment,
        date: new Date().toISOString()
      };
      dispatch(addReview({ bookId: book.id, review }));
      dispatch(addNotification({
        type: 'success',
        title: 'Review Added',
        message: 'Thank you for your review!'
      }));
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
          <form onSubmit={handleSubmit} className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Review "{book.title}"
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const BookCard = ({ book }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            book.available 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {book.available ? 'Available' : 'Borrowed'}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <button
            onClick={() => handleAddToWishlist(book)}
            className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Heart className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          by {book.author}
        </p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(book.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            ({book.rating.toFixed(1)}) • {book.reviews?.length || 0} reviews
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {book.publishedYear}
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
            {book.genre}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {book.availableCopies}/{book.totalCopies} available
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => dispatch(setSelectedBook(book))}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Details
          </button>
          
          {user?.role === 'user' && (
            <>
              <button
                onClick={() => handleBorrowBook(book)}
                disabled={!book.available}
                className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                  book.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {book.available ? 'Borrow' : 'Unavailable'}
              </button>
              
              <button
                onClick={() => handleShareBook(book)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const BookDetailModal = ({ book, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Book Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">by {book.author}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    ({book.rating.toFixed(1)})
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Genre:</span>
                  <span className="font-medium">{book.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Published:</span>
                  <span className="font-medium">{book.publishedYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
                  <span className="font-medium">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                  <span className={`font-medium ${book.available ? 'text-green-600' : 'text-red-600'}`}>
                    {book.availableCopies}/{book.totalCopies} available
                  </span>
                </div>
              </div>

              {user?.role === 'user' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      handleBorrowBook(book);
                      onClose();
                    }}
                    disabled={!book.available}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                      book.available
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {book.available ? 'Borrow This Book' : 'Currently Unavailable'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setReviewingBook(book);
                      setShowReviewModal(true);
                    }}
                    className="flex items-center px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Review
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Reviews Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Reviews ({book.reviews?.length || 0})
            </h4>
            {book.reviews && book.reviews.length > 0 ? (
              <div className="space-y-4">
                {book.reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {review.userName}
                        </span>
                        <div className="flex items-center ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No reviews yet. Be the first to review this book!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Book Catalog
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredBooks.length} books found
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
            <option value="popularity">Sort by Popularity</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genre
                </label>
                <select
                  value={selectedGenre}
                  onChange={(e) => dispatch(setSelectedGenre(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Publication Year
                </label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    dispatch(setSelectedGenre(''));
                    setYearFilter('');
                    setRatingFilter('');
                    dispatch(setSearchTerm(''));
                  }}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No books found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search criteria or browse all books.
          </p>
        </div>
      )}

      {/* Modals */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => dispatch(setSelectedBook(null))}
        />
      )}

      {showReviewModal && reviewingBook && (
        <ReviewModal
          book={reviewingBook}
          onClose={() => {
            setShowReviewModal(false);
            setReviewingBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookCatalog;