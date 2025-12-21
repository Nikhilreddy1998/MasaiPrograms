import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ComparisonPage from './pages/ComparisonPage.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <FilterPanel />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
      </Routes>
    </div>
  );
}

export default App;