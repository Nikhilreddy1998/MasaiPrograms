import React, { useState, useEffect, useMemo } from 'react';
import { fetchMockData } from '../services/api';
import { addBookmarkToFirebase, fetchBookmarksFromFirebase } from '../services/bookmarks';
import EstablishmentList from '../components/EstablishmentList';
import SearchAndFilter from '../components/SearchAndFilter';
import Pagination from '../components/Pagination';
import { Utensils } from 'lucide-react';

function HomePage() {
  const [establishments, setEstablishments] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    searchTerm: '',
    ratingFilter: '',
    localAuthorityFilter: '',
    currentPage: 1
  });
  
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting data fetch...');
        
        const data = await fetchMockData();
        console.log('Data fetched successfully:', data?.length, 'establishments');
        
        if (!data || data.length === 0) {
          throw new Error('No establishments data available');
        }
        
        setEstablishments(data);
        
        const savedBookmarks = await fetchBookmarksFromFirebase();
        setBookmarks(savedBookmarks);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load establishments data. Please try again later.');
        setEstablishments([]); // Reset establishments on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const localAuthorities = useMemo(() => {
    const authorities = establishments.map(est => est.LocalAuthorityName);
    return [...new Set(authorities)].sort();
  }, [establishments]);

  const filteredEstablishments = useMemo(() => {
    return establishments.filter(establishment => {
      const matchesSearch = filters.searchTerm === '' || 
        establishment.BusinessName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (establishment.PostCode && establishment.PostCode.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      const matchesRating = filters.ratingFilter === '' || 
        establishment.RatingValue === filters.ratingFilter;
      
      const matchesAuthority = filters.localAuthorityFilter === '' || 
        establishment.LocalAuthorityName === filters.localAuthorityFilter;
      
      return matchesSearch && matchesRating && matchesAuthority;
    });
  }, [establishments, filters.searchTerm, filters.ratingFilter, filters.localAuthorityFilter]);

  const currentEstablishments = useMemo(() => {
    const startIndex = (filters.currentPage - 1) * itemsPerPage;
    return filteredEstablishments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEstablishments, filters.currentPage]);

  const totalPages = Math.ceil(filteredEstablishments.length / itemsPerPage);

  const handleBookmark = async (establishment) => {
    try {
      const newBookmark = await addBookmarkToFirebase(establishment);
      setBookmarks(prev => [...prev, newBookmark]);
    } catch (error) {
      console.error('Error bookmarking establishment:', error);
      setError('Failed to bookmark establishment. Please try again.');
    }
  };

  const handleSearchTermChange = (term) => {
    setFilters(prev => ({ ...prev, searchTerm: term, currentPage: 1 }));
  };

  const handleRatingFilterChange = (rating) => {
    setFilters(prev => ({ ...prev, ratingFilter: rating, currentPage: 1 }));
  };

  const handleLocalAuthorityFilterChange = (authority) => {
    setFilters(prev => ({ ...prev, localAuthorityFilter: authority, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Food Hygiene Ratings</h2>
        <p className="text-gray-600">
          Browse and search food hygiene ratings for establishments across the UK.
        </p>
      </div>

      <SearchAndFilter
        searchTerm={filters.searchTerm}
        setSearchTerm={handleSearchTermChange}
        ratingFilter={filters.ratingFilter}
        setRatingFilter={handleRatingFilterChange}
        localAuthorityFilter={filters.localAuthorityFilter}
        setLocalAuthorityFilter={handleLocalAuthorityFilterChange}
        localAuthorities={localAuthorities}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mb-4 text-gray-600">
          {filteredEstablishments.length === 0 ? (
            <p>No establishments found matching your criteria.</p>
          ) : (
            <p>
              Showing {Math.min(filteredEstablishments.length, itemsPerPage)} of {filteredEstablishments.length} establishments
            </p>
          )}
        </div>
      )}

      <EstablishmentList
        establishments={currentEstablishments}
        bookmarks={bookmarks}
        onBookmark={handleBookmark}
        loading={loading}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={filters.currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {!loading && filteredEstablishments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md mt-6">
          <Utensils className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No establishments found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Try adjusting your search criteria or filters to find establishments.
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage;