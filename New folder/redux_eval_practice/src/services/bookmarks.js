import { ref, push, get, remove } from 'firebase/database';
import { database, BOOKMARKS_NODE } from '../firebase';

export const addBookmarkToFirebase = async (establishment) => {
  try {
    const bookmarkData = {
      name: establishment.BusinessName,
      address: formatAddress(establishment),
      ratingValue: establishment.RatingValue,
      dateRated: establishment.RatingDate,
      localAuthorityName: establishment.LocalAuthorityName,
    };

    const bookmarksRef = ref(database, BOOKMARKS_NODE);
    const newBookmarkRef = await push(bookmarksRef, bookmarkData);
    
    return {
      id: newBookmarkRef.key || undefined,
      ...bookmarkData
    };
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

export const fetchBookmarksFromFirebase = async () => {
  try {
    const bookmarksRef = ref(database, BOOKMARKS_NODE);
    const snapshot = await get(bookmarksRef);
    
    const bookmarks = [];
    snapshot.forEach((childSnapshot) => {
      bookmarks.push({
        id: childSnapshot.key || undefined,
        ...childSnapshot.val()
      });
    });
    
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
};

export const removeBookmarkFromFirebase = async (bookmarkId) => {
  try {
    const bookmarkRef = ref(database, `${BOOKMARKS_NODE}/${bookmarkId}`);
    await remove(bookmarkRef);
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

export const formatAddress = (establishment) => {
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

export const isEstablishmentBookmarked = (establishment, bookmarks) => {
  return bookmarks.some(bookmark => 
    bookmark.name === establishment.BusinessName && 
    bookmark.address.includes(establishment.PostCode || '')
  );
};