import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstablishmentsAsync, selectEstablishments, selectSearchTerm, 
  setSearchTerm, setCurrentPage } from '../store/slices/establishmentsSlice';
import { fetchBookmarksAsync, addBookmarkAsync, selectBookmarks } from '../store/slices/bookmarksSlice';
import SearchBar from '../components/SearchBar';
import EstablishmentCard from '../components/EstablishmentCard';
import Pagination from '../components/Pagination';

function HomePage() {
  const dispatch = useDispatch();
  const establishments = useSelector(selectEstablishments);
  const searchTerm = useSelector(selectSearchTerm);
  const bookmarks = useSelector(selectBookmarks);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchEstablishmentsAsync());
    dispatch(fetchBookmarksAsync());
  }, [dispatch]);

  const filteredEstablishments = establishments.filter(est => 
    est.BusinessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.PostCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEstablishments.length / itemsPerPage);
  const currentEstablishments = filteredEstablishments.slice(0, itemsPerPage);

  return (
    <div>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={(term) => dispatch(setSearchTerm(term))} 
      />
      <div className="space-y-4 mb-6">
        {currentEstablishments.map((establishment) => (
          <EstablishmentCard 
            key={establishment.FHRSID}
            establishment={establishment}
            isBookmarked={bookmarks.some(b => b.name === establishment.BusinessName)}
            onBookmark={() => dispatch(addBookmarkAsync(establishment))}
          />
        ))}
      </div>
      <Pagination 
        currentPage={1}
        totalPages={totalPages}
        setCurrentPage={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
}

export default HomePage;