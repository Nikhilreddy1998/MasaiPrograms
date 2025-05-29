import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Utensils, BookmarkIcon, Home } from 'lucide-react';
import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';
import EstablishmentDetailPage from './pages/EstablishmentDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Utensils className="w-8 h-8 text-green-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">Food Hygiene Explorer</h1>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      to="/"
                      className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-150"
                    >
                      <Home size={18} className="mr-1" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bookmarks"
                      className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-150"
                    >
                      <BookmarkIcon size={18} className="mr-1" />
                      <span>Bookmarks</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/establishment/:id" element={<EstablishmentDetailPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>Food Hygiene Ratings Explorer &copy; {new Date().getFullYear()}</p>
            <p className="mt-1">Data sourced from the Food Standards Agency Open Data API</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;