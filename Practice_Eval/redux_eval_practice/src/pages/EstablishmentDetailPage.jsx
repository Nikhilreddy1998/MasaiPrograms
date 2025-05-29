import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchHygieneData, fetchMockData } from '../services/api';
import { addBookmarkToFirebase, fetchBookmarksFromFirebase, isEstablishmentBookmarked } from '../services/bookmarks';
import RatingBadge from '../components/RatingBadge';
import { ArrowLeft, MapPin, Building, Calendar, Info, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';

function EstablishmentDetailPage() {
  const { id } = useParams();
  const [establishment, setEstablishment] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [bookmarkSuccess, setBookmarkSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allEstablishments = await fetchMockData();
        const foundEstablishment = allEstablishments.find(est => est.FHRSID.toString() === id);
        
        if (foundEstablishment) {
          setEstablishment(foundEstablishment);
        } else {
          setError('Establishment not found');
        }
        
        const savedBookmarks = await fetchBookmarksFromFirebase();
        setBookmarks(savedBookmarks);
      } catch (err) {
        console.error('Error fetching establishment details:', err);
        setError('Failed to load establishment details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleBookmark = async () => {
    if (!establishment) return;
    
    try {
      setBookmarkLoading(true);
      const newBookmark = await addBookmarkToFirebase(establishment);
      setBookmarks(prev => [...prev, newBookmark]);
      setBookmarkSuccess(true);
      
      setTimeout(() => {
        setBookmarkSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error bookmarking establishment:', error);
      setError('Failed to bookmark establishment. Please try again.');
    } finally {
      setBookmarkLoading(false);
    }
  };

  const isBookmarked = establishment && bookmarks.length > 0 
    ? isEstablishmentBookmarked(establishment, bookmarks)
    : false;

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <p className="mb-6">The establishment you're looking for could not be found or there was an error loading the data.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-150"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
      </div>
    );
  }

  if (!establishment) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Establishment Not Found</h2>
        <p className="mb-6">We couldn't find the establishment you're looking for.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-150"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
      </div>
    );
  }

  const formatAddress = () => {
    return [
      establishment.AddressLine1,
      establishment.AddressLine2,
      establishment.AddressLine3,
      establishment.AddressLine4,
      establishment.PostCode
    ]
      .filter(Boolean)
      .join(', ');
  };

  const formattedDate = new Date(establishment.RatingDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-150"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to all establishments
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">{establishment.BusinessName}</h1>
            <RatingBadge rating={establishment.RatingValue} size="lg" />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex">
              <MapPin size={20} className="flex-shrink-0 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Address</h3>
                <p className="text-gray-800">{formatAddress()}</p>
              </div>
            </div>

            <div className="flex">
              <Building size={20} className="flex-shrink-0 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Local Authority</h3>
                <p className="text-gray-800">{establishment.LocalAuthorityName}</p>
                {establishment.LocalAuthorityWebSite && (
                  <a 
                    href={establishment.LocalAuthorityWebSite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-800 mt-1"
                  >
                    Visit local authority website
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex">
              <Calendar size={20} className="flex-shrink-0 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Rating Date</h3>
                <p className="text-gray-800">{formattedDate}</p>
                {establishment.NewRatingPending && (
                  <div className="mt-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-md inline-block">
                    New rating pending
                  </div>
                )}
              </div>
            </div>

            <div className="flex">
              <Info size={20} className="flex-shrink-0 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Business Type</h3>
                <p className="text-gray-800">{establishment.BusinessType}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <button
            onClick={handleBookmark}
            disabled={isBookmarked || bookmarkLoading}
            className={`
              inline-flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200
              ${isBookmarked || bookmarkSuccess
                ? 'bg-gray-100 text-gray-500 cursor-default'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
              }
            `}
          >
            {isBookmarked || bookmarkSuccess ? (
              <>
                <BookmarkCheck size={18} className="mr-2" />
                Saved to Bookmarks
              </>
            ) : (
              <>
                <Bookmark size={18} className="mr-2" />
                {bookmarkLoading ? 'Saving...' : 'Save to Bookmarks'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstablishmentDetailPage;