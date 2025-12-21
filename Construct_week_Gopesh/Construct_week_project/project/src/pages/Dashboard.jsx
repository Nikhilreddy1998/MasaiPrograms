import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp,
  Clock,
  AlertCircle,
  Star,
  Plus
} from 'lucide-react';
import { addNotification } from '../store/slices/notificationsSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);
  const { users } = useSelector((state) => state.users);
  const { borrowedBooks, fines } = useSelector((state) => state.borrowing);
  const dispatch = useDispatch();

  const isLibrarian = user?.role === 'librarian';

  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.available).length;
  const borrowedBooksCount = borrowedBooks.filter(record => !record.returned).length;
  const totalUsers = users.filter(u => u.role === 'user').length;
  const unpaidFines = fines.filter(fine => !fine.paid).reduce((sum, fine) => sum + fine.amount, 0);

  // Get user's borrowed books
  const userBorrowedBooks = borrowedBooks.filter(
    record => record.userId === user?.id && !record.returned
  );

  // Get user's fines
  const userFines = fines.filter(fine => fine.userId === user?.id && !fine.paid);

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Book Club Meeting",
      date: "2024-01-15",
      time: "6:00 PM",
      description: "Discussion of 'The Great Gatsby'"
    },
    {
      id: 2,
      title: "Author Reading Session",
      date: "2024-01-20",
      time: "3:00 PM",
      description: "Local author reading from their latest work"
    },
    {
      id: 3,
      title: "Children's Story Time",
      date: "2024-01-22",
      time: "10:00 AM",
      description: "Interactive storytelling for kids"
    }
  ];

  // Popular books
 const popularBooks = [...books] // Create a new array from 'books'
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3);

  useEffect(() => {
    // Add welcome notification
    dispatch(addNotification({
      type: 'info',
      title: 'Welcome back!',
      message: `Good to see you again, ${user?.name}. Check out what's new in the library.`
    }));
  }, [dispatch, user?.name]);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (isLibrarian) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Librarian Dashboard
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {user?.name}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={BookOpen}
            title="Total Books"
            value={totalBooks}
            subtitle={`${availableBooks} available`}
            color="blue"
          />
          <StatCard
            icon={Users}
            title="Active Users"
            value={totalUsers}
            subtitle="Registered members"
            color="green"
          />
          <StatCard
            icon={Clock}
            title="Borrowed Books"
            value={borrowedBooksCount}
            subtitle="Currently out"
            color="orange"
          />
          <StatCard
            icon={AlertCircle}
            title="Unpaid Fines"
            value={`$${unpaidFines.toFixed(2)}`}
            subtitle="Outstanding"
            color="red"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Books */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Popular Books
            </h3>
            <div className="space-y-4">
              {popularBooks.map((book, index) => (
                <div key={book.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {book.author}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-xs text-gray-500">
                        {book.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    New book "Modern React" added
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    John Doe returned "The Great Gatsby"
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Overdue notice sent to Jane Smith
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add New Book
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Users className="h-4 w-4 mr-2" />
              Add New User
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User Dashboard
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={BookOpen}
          title="Books Borrowed"
          value={userBorrowedBooks.length}
          subtitle="Currently reading"
          color="blue"
        />
        <StatCard
          icon={Star}
          title="Books Read"
          value="12"
          subtitle="This year"
          color="green"
        />
        <StatCard
          icon={AlertCircle}
          title="Outstanding Fines"
          value={`$${userFines.reduce((sum, fine) => sum + fine.amount, 0).toFixed(2)}`}
          subtitle={userFines.length > 0 ? 'Needs attention' : 'All clear!'}
          color={userFines.length > 0 ? 'red' : 'green'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Currently Borrowed Books */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Currently Borrowed Books
          </h3>
          {userBorrowedBooks.length > 0 ? (
            <div className="space-y-4">
              {userBorrowedBooks.map((record) => (
                <div key={record.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-16 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {record.bookTitle}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {new Date(record.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                    Return
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                You haven't borrowed any books yet. Visit the catalog to get started!
              </p>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Books */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recommended for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularBooks.map((book) => (
            <div key={book.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              <img
                src={book.cover}
                alt={book.title}
                className="w-12 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-xs text-gray-500">
                    {book.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;