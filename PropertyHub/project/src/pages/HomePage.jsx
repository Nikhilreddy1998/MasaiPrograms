import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar.jsx';
import PropertyGrid from '../components/PropertyGrid.jsx';
import HeroSection from '../components/HeroSection.jsx';
import StatsSection from '../components/StatsSection.jsx';
import { setFilteredProperties } from '../store/slices/propertiesSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set page title
    document.title = 'PropertyHub - Find Your Dream Home';
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar />

        {/* Property Grid */}
        <PropertyGrid />
      </div>
    </div>
  );
};

export default HomePage;