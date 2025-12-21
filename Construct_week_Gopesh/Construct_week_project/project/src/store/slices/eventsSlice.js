import { createSlice } from '@reduxjs/toolkit';

const sampleEvents = [
  {
    id: 1,
    title: "Book Club Meeting",
    description: "Join us for a discussion of 'The Great Gatsby' by F. Scott Fitzgerald. We'll explore themes of wealth, love, and the American Dream.",
    date: "2024-01-15",
    time: "18:00",
    location: "Main Reading Room",
    category: "book-club",
    maxAttendees: 20,
    attendees: [2],
    createdBy: 1
  },
  {
    id: 2,
    title: "Author Reading Session",
    description: "Local author Sarah Johnson will be reading from her latest mystery novel 'Shadows in the Library'.",
    date: "2024-01-20",
    time: "15:00",
    location: "Community Hall",
    category: "reading",
    maxAttendees: 50,
    attendees: [],
    createdBy: 1
  },
  {
    id: 3,
    title: "Children's Story Time",
    description: "Interactive storytelling session for children ages 4-8. This week featuring classic fairy tales with puppet shows.",
    date: "2024-01-22",
    time: "10:00",
    location: "Children's Section",
    category: "community",
    maxAttendees: 15,
    attendees: [],
    createdBy: 1
  },
  {
    id: 4,
    title: "Digital Literacy Workshop",
    description: "Learn how to use our digital resources, including eBooks, online databases, and research tools.",
    date: "2024-01-25",
    time: "14:00",
    location: "Computer Lab",
    category: "workshop",
    maxAttendees: 12,
    attendees: [],
    createdBy: 1
  }
];

const initialState = {
  events: sampleEvents,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    registerForEvent: (state, action) => {
      const { eventId, userId } = action.payload;
      const event = state.events.find(e => e.id === eventId);
      if (event && !event.attendees.includes(userId) && event.attendees.length < event.maxAttendees) {
        event.attendees.push(userId);
      }
    },
    unregisterFromEvent: (state, action) => {
      const { eventId, userId } = action.payload;
      const event = state.events.find(e => e.id === eventId);
      if (event) {
        event.attendees = event.attendees.filter(id => id !== userId);
      }
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
} = eventsSlice.actions;

export default eventsSlice.reducer;