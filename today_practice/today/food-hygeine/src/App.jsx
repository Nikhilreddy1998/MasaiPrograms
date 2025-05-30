import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHygieneData, setSearchTerm, addBookmark, fetchBookmarks, removeBookmark } from './store';

const getRatingClass = r => {
  const s = String(r);
  if (s === '5') return 'rating-5';
  if (s === '3' || s === '4') return 'rating-3-4';
  if (['0', '1', '2'].includes(s)) return 'rating-0-1-2';
  return 'rating-other';
};

const HygieneList = () => {
  const dispatch = useDispatch();
  const { filtered, status, searchTerm } = useSelector(state => state.hygiene);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchHygieneData());
  }, [status, dispatch]);

  if (status === 'loading') return <div className="loading-message">Loading data...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onChange={e => dispatch(setSearchTerm(e.target.value))}
      />
      {filtered.length === 0 ? <p className="no-results-message">No results.</p> : (
        <ul>
          {filtered.slice(0, 5).map(p => ( 
            <li key={p.FHRSID} className={`list-item ${getRatingClass(p.RatingValue)}`}>
              <h3>{p.BusinessName}</h3>
              <p>{p.AddressLine1}, {p.PostCode}</p>
              <button onClick={() => dispatch(addBookmark({ name: p.BusinessName, address: `${p.AddressLine1}, ${p.PostCode}` }))} className="bookmark-button">
                Add to Bookmarks
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const BookmarksPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.bookmarks);

  useEffect(() => { dispatch(fetchBookmarks()); }, [dispatch]);

  if (status === 'loading') return <div className="loading-message">Loading bookmarks...</div>;

  return (
    <div className="bookmarks-page">
      <h2>My Bookmarks</h2>
      {items.length === 0 ? <p className="no-results-message">No bookmarks yet.</p> : (
        <ul>
          {items.map(b => (
            <li key={b.id} className="bookmark-list-item">
              <h3>{b.name}</h3>
              <p>{b.address}</p>
              <button onClick={() => dispatch(removeBookmark(b.id))} className="remove-bookmark-button">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <header className="header">
        <h1>Explorer</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/bookmarks">Bookmarks</Link>
        </nav>
      </header>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HygieneList />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;