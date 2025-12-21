import { createSlice } from '@reduxjs/toolkit';

const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    isbn: "978-0-7432-7356-5",
    publishedYear: 1925,
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway as he tells the story of his neighbor Jay Gatsby.",
    cover: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg",
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    rating: 4.2,
    reviews: [
      {
        id: 1,
        userId: 2,
        userName: "John Doe",
        rating: 4,
        comment: "A masterpiece of American literature. Fitzgerald's prose is beautiful and the themes are timeless.",
        date: "2024-01-10T10:00:00Z"
      }
    ],
    wishlistedBy: []
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    isbn: "978-0-06-112008-4",
    publishedYear: 1960,
    description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch as her father defends a black man falsely accused of rape.",
    cover: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    available: true,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.5,
    reviews: [
      {
        id: 2,
        userId: 2,
        userName: "John Doe",
        rating: 5,
        comment: "An incredibly powerful story about justice, morality, and growing up. A must-read.",
        date: "2024-01-08T14:30:00Z"
      }
    ],
    wishlistedBy: []
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    isbn: "978-0-452-28423-4",
    publishedYear: 1949,
    description: "A dystopian social science fiction novel about totalitarianism and surveillance, following Winston Smith as he struggles against the oppressive regime of Big Brother.",
    cover: "https://images.pexels.com/photos/1130641/pexels-photo-1130641.jpeg",
    available: false,
    totalCopies: 3,
    availableCopies: 0,
    rating: 4.3,
    reviews: [],
    wishlistedBy: []
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    isbn: "978-0-14-143951-8",
    publishedYear: 1813,
    description: "A romantic novel about manners, upbringing, morality, and marriage in Georgian England, following the relationship between Elizabeth Bennet and Mr. Darcy.",
    cover: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg",
    available: true,
    totalCopies: 6,
    availableCopies: 4,
    rating: 4.4,
    reviews: [],
    wishlistedBy: []
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-age Fiction",
    isbn: "978-0-316-76948-0",
    publishedYear: 1951,
    description: "A controversial novel about teenage rebellion and alienation, following Holden Caulfield's experiences in New York City after being expelled from prep school.",
    cover: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg",
    available: true,
    totalCopies: 3,
    availableCopies: 1,
    rating: 3.9,
    reviews: [],
    wishlistedBy: []
  },
  {
    id: 6,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    isbn: "978-0-544-00341-5",
    publishedYear: 1954,
    description: "An epic high fantasy novel following the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
    cover: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg",
    available: true,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.8,
    reviews: [],
    wishlistedBy: []
  },
  {
    id: 7,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    isbn: "978-0-7475-3269-9",
    publishedYear: 1997,
    description: "The first book in the Harry Potter series, following a young wizard's journey at Hogwarts School of Witchcraft and Wizardry.",
    cover: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    available: true,
    totalCopies: 8,
    availableCopies: 5,
    rating: 4.7,
    reviews: [],
    wishlistedBy: []
  },
  {
    id: 8,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction",
    isbn: "978-0-345-39180-3",
    publishedYear: 1979,
    description: "A comedic science fiction series following Arthur Dent's adventures through space after Earth is destroyed.",
    cover: "https://images.pexels.com/photos/1130641/pexels-photo-1130641.jpeg",
    available: true,
    totalCopies: 3,
    availableCopies: 1,
    rating: 4.1,
    reviews: [],
    wishlistedBy: []
  }
];

const initialState = {
  books: sampleBooks,
  searchTerm: '',
  selectedGenre: '',
  selectedBook: null,
  loading: false,
  error: null,
  recommendations: [],
  wishlist: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    borrowBook: (state, action) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book && book.availableCopies > 0) {
        book.availableCopies -= 1;
        book.available = book.availableCopies > 0;
      }
    },
    returnBook: (state, action) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book && book.availableCopies < book.totalCopies) {
        book.availableCopies += 1;
        book.available = true;
      }
    },
    addReview: (state, action) => {
      const { bookId, review } = action.payload;
      const book = state.books.find(book => book.id === bookId);
      if (book) {
        if (!book.reviews) book.reviews = [];
        book.reviews.push(review);
        const totalRating = book.reviews.reduce((sum, r) => sum + r.rating, 0);
        book.rating = totalRating / book.reviews.length;
      }
    },
    addToWishlist: (state, action) => {
      const { userId, bookId } = action.payload;
      const book = state.books.find(book => book.id === bookId);
      if (book && !book.wishlistedBy.includes(userId)) {
        book.wishlistedBy.push(userId);
      }
    },
    removeFromWishlist: (state, action) => {
      const { userId, bookId } = action.payload;
      const book = state.books.find(book => book.id === bookId);
      if (book) {
        book.wishlistedBy = book.wishlistedBy.filter(id => id !== userId);
      }
    },
    generateRecommendations: (state, action) => {
      const { userId, borrowingHistory } = action.payload;
      // Simple recommendation algorithm based on genre preferences
      const userGenres = borrowingHistory.map(bookId => {
        const book = state.books.find(b => b.id === bookId);
        return book?.genre;
      }).filter(Boolean);
      
      const genreCount = userGenres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});
      
      const preferredGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
      
      const recommendations = state.books
        .filter(book => 
          preferredGenres.includes(book.genre) && 
          book.available &&
          !borrowingHistory.includes(book.id)
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
        
      state.recommendations = recommendations;
    },
  },
});

export const {
  setSearchTerm,
  setSelectedGenre,
  setSelectedBook,
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  addReview,
  addToWishlist,
  removeFromWishlist,
  generateRecommendations,
} = booksSlice.actions;

export default booksSlice.reducer;