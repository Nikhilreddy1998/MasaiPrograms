import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  Edit,
  Trash2,
  UserPlus,
  CheckCircle
} from 'lucide-react';
import { addEvent, updateEvent, deleteEvent, registerForEvent } from '../store/slices/eventsSlice';

const Events = () => {
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const isLibrarian = user?.role === 'librarian';

  const EventForm = ({ event, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: event?.title || '',
      description: event?.description || '',
      date: event?.date || '',
      time: event?.time || '',
      location: event?.location || '',
      maxAttendees: event?.maxAttendees || 50,
      category: event?.category || 'workshop'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const eventData = {
        ...formData,
        id: event?.id || Date.now(),
        attendees: event?.attendees || [],
        createdBy: user.id
      };
      onSave(eventData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
          <form onSubmit={handleSubmit} className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {event ? 'Edit Event' : 'Create New Event'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="book-club">Book Club</option>
                    <option value="reading">Reading Session</option>
                    <option value="lecture">Lecture</option>
                    <option value="community">Community Event</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({ ...formData, maxAttendees: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {event ? 'Update' : 'Create'} Event
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      dispatch(updateEvent(eventData));
      setEditingEvent(null);
    } else {
      dispatch(addEvent(eventData));
      setShowAddModal(false);
    }
  };

  const handleRegister = (eventId) => {
    dispatch(registerForEvent({ eventId, userId: user.id }));
  };

  const isRegistered = (event) => {
    return event.attendees?.includes(user.id);
  };

  const isFull = (event) => {
    return event.attendees?.length >= event.maxAttendees;
  };

  const getCategoryColor = (category) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'book-club': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      reading: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      lecture: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      community: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    };
    return colors[category] || colors.workshop;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Library Events
        </h1>
        {isLibrarian && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </button>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category.replace('-', ' ')}
                  </span>
                </div>
                {isLibrarian && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => dispatch(deleteEvent(event.id))}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees?.length || 0} / {event.maxAttendees} attendees
                </div>
              </div>

              {user?.role === 'user' && (
                <div className="flex space-x-2">
                  {isRegistered(event) ? (
                    <button
                      disabled
                      className="flex items-center px-3 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg cursor-not-allowed"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Registered
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={isFull(event)}
                      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                        isFull(event)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {isFull(event) ? 'Full' : 'Register'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No events scheduled
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isLibrarian ? 'Create your first event to get started.' : 'Check back later for upcoming events.'}
          </p>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <EventForm
          onSave={handleSaveEvent}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
};

export default Events;