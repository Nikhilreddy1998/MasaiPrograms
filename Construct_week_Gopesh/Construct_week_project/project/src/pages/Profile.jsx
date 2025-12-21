import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  Clock,
  Star,
  Edit,
  Save,
  X,
  AlertCircle
} from 'lucide-react';
import { updateUser } from '../store/slices/usersSlice';
import { returnBook } from '../store/slices/borrowingSlice';
import { returnBook as returnBookFromCatalog } from '../store/slices/booksSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { borrowedBooks, fines } = useSelector((state) => state.borrowing);
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Get user's borrowed books
  const userBorrowedBooks = borrowedBooks.filter(
    record => record.userId === user?.id && !record.returned
  );

  // Get user's fines
  const userFines = fines.filter(fine => fine.userId === user?.id && !fine.paid);

  // Get reading history
  const readingHistory = borrowedBooks.filter(
    record => record.userId === user?.id && record.returned
  );

  const handleEditSubmit = () => {
    const updatedUser = { ...user, ...editForm };
    dispatch(updateUser(updatedUser));
    setIsEditing(false);
  };

  const handleReturnBook = (borrowRecord) => {
    dispatch(returnBook({ userId: user.id, bookId: borrowRecord.bookId }));
    dispatch(returnBookFromCatalog(borrowRecord.bookId));
  };

  const getBookDetails = (bookId) => {
    return books.find(book => book.id === bookId);
  };

  const calculateDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleEditSubmit}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user?.address || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      Member since {user?.memberSince ? new Date(user.memberSince).getFullYear() : 'N/A'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Statistics */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {userBorrowedBooks.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Currently Borrowed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {readingHistory.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Books Read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outstanding Fines */}
          {userFines.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                  Outstanding Fines
                </h3>
              </div>
              <div className="space-y-3">
                {userFines.map((fine) => (
                  <div key={fine.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${fine.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {fine.daysOverdue} days overdue
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Pay Fine
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Currently Borrowed Books */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Currently Borrowed Books
            </h3>
            {userBorrowedBooks.length > 0 ? (
              <div className="space-y-4">
                {userBorrowedBooks.map((record) => {
                  const book = getBookDetails(record.bookId);
                  const daysUntilDue = calculateDaysUntilDue(record.dueDate);
                  
                  return (
                    <div key={record.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        {book ? (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.bookTitle}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Borrowed: {new Date(record.borrowDate).toLocaleDateString()}
                        </p>
                        <p className={`text-sm ${
                          daysUntilDue < 0 
                            ? 'text-red-600 dark:text-red-400' 
                            : daysUntilDue <= 3 
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {daysUntilDue < 0 
                            ? `Overdue by ${Math.abs(daysUntilDue)} days`
                            : `Due in ${daysUntilDue} days`
                          }
                        </p>
                      </div>
                      <button
                        onClick={() => handleReturnBook(record)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Return
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No books currently borrowed
                </p>
              </div>
            )}
          </div>

          {/* Reading History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Reading History
            </h3>
            {readingHistory.length > 0 ? (
              <div className="space-y-4">
                {readingHistory.slice(0, 5).map((record) => {
                  const book = getBookDetails(record.bookId);
                  
                  return (
                    <div key={record.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        {book ? (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.bookTitle}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Returned: {new Date(record.returnDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          <Star className="h-4 w-4 mr-1" />
                          Rate
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No reading history yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;