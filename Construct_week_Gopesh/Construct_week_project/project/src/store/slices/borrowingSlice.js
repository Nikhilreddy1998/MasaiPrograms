import { createSlice } from '@reduxjs/toolkit';
import { addDays } from 'date-fns';

const initialState = {
  borrowedBooks: [],
  reservations: [],
  fines: [],
  loading: false,
  error: null,
};

const borrowingSlice = createSlice({
  name: 'borrowing',
  initialState,
  reducers: {
    borrowBook: (state, action) => {
      const { userId, bookId, bookTitle, dueDate } = action.payload;
      const borrowRecord = {
        id: Date.now(),
        userId,
        bookId,
        bookTitle,
        borrowDate: new Date().toISOString(),
        dueDate: dueDate || addDays(new Date(), 14).toISOString(),
        returned: false,
        fine: 0,
      };
      state.borrowedBooks.push(borrowRecord);
    },
    returnBook: (state, action) => {
      const { userId, bookId } = action.payload;
      const borrowRecord = state.borrowedBooks.find(
        record => record.userId === userId && record.bookId === bookId && !record.returned
      );
      if (borrowRecord) {
        borrowRecord.returned = true;
        borrowRecord.returnDate = new Date().toISOString();
        
        // Calculate fine if overdue
        const dueDate = new Date(borrowRecord.dueDate);
        const returnDate = new Date();
        if (returnDate > dueDate) {
          const daysOverdue = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
          const fine = daysOverdue * 0.25; // $0.25 per day
          borrowRecord.fine = fine;
          
          state.fines.push({
            id: Date.now(),
            userId,
            bookId,
            amount: fine,
            daysOverdue,
            paid: false,
            date: new Date().toISOString(),
          });
        }
      }
    },
    reserveBook: (state, action) => {
      const { userId, bookId, bookTitle } = action.payload;
      const reservation = {
        id: Date.now(),
        userId,
        bookId,
        bookTitle,
        reserveDate: new Date().toISOString(),
        notified: false,
      };
      state.reservations.push(reservation);
    },
    cancelReservation: (state, action) => {
      const { userId, bookId } = action.payload;
      state.reservations = state.reservations.filter(
        reservation => !(reservation.userId === userId && reservation.bookId === bookId)
      );
    },
    payFine: (state, action) => {
      const fineId = action.payload;
      const fine = state.fines.find(f => f.id === fineId);
      if (fine) {
        fine.paid = true;
        fine.paidDate = new Date().toISOString();
      }
    },
  },
});

export const {
  borrowBook,
  returnBook,
  reserveBook,
  cancelReservation,
  payFine,
} = borrowingSlice.actions;

export default borrowingSlice.reducer;