import { ref, push, get, remove } from 'firebase/database';
import { db } from '../firebase';

const BOOKMARKS_REF = 'bookmarkedPremises';

export async function addBookmark(establishment) {
  const bookmarkData = {
    name: establishment.BusinessName,
    address: `${establishment.AddressLine1}, ${establishment.PostCode}`,
    ratingValue: establishment.RatingValue,
    dateRated: new Date().toISOString(),
    localAuthorityName: establishment.LocalAuthorityName || 'Unknown'
  };
  
  const newBookmarkRef = await push(ref(db, BOOKMARKS_REF), bookmarkData);
  return { id: newBookmarkRef.key, ...bookmarkData };
}

export async function getBookmarks() {
  const snapshot = await get(ref(db, BOOKMARKS_REF));
  const bookmarks = [];
  snapshot.forEach((child) => {
    bookmarks.push({ id: child.key, ...child.val() });
  });
  return bookmarks;
}

export async function removeBookmark(id) {
  await remove(ref(db, `${BOOKMARKS_REF}/${id}`));
}

export function isEstablishmentBookmarked(establishment, bookmarks) {
  return bookmarks.some(bookmark => bookmark.name === establishment.BusinessName);
}