import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Utensils, Bookmark } from 'lucide-react';
import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';
import EstablishmentDetailPage from './pages/EstablishmentDetailPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <Utensils className="w-6 h-6 text-green-600 mr-2" />
                <h1 className="text-xl font-semibold text-gray-800">Food Hygiene Ratings</h1>
              </Link>
              <Link to="/bookmarks" className="flex items-center text-gray-600 hover:text-green-600">
                <Bookmark className="w-5 h-5 mr-1" />
                <span>Bookmarks</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/establishment/:id" element={<EstablishmentDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App