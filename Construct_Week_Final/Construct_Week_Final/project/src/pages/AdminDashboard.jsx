import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus, Home, Users, MessageSquare, TrendingUp, Edit, Trash2, 
  Eye, Calendar, MapPin, DollarSign, Bed, Bath, Square, Upload, X, Heart
} from 'lucide-react';
import { addProperty, deleteProperty, updateStats } from '../store/slices/adminSlice.js';
import { addRecentActivity } from '../store/slices/adminSlice.js';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const { userInquiries, users } = useSelector(state => state.auth);
  const { managedProperties, stats } = useSelector(state => state.admin);
  const { allProperties } = useSelector(state => state.properties);
  const { userFavorites } = useSelector(state => state.favorites);
  
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    type: 'apartment',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    location: '',
    address: '',
    description: '',
    amenities: [],
    images: []
  });

  const amenitiesList = [
    'Pool', 'Gym', 'Parking', 'Balcony', 'Garden', 'Fireplace', 
    'Garage', 'Doorman', 'Deck', 'Basement', 'Concierge', 'Terrace'
  ];

  // Combine all properties for favorites lookup
  const allAvailableProperties = [...allProperties, ...managedProperties];

  // Get user favorites with property details
  const getUserFavoritesWithDetails = () => {
    const favoritesData = [];
    
    Object.entries(userFavorites).forEach(([userId, propertyIds]) => {
      const user = users.find(u => u.id === parseInt(userId));
      if (user && propertyIds.length > 0) {
        const favoriteProperties = propertyIds.map(propertyId => 
          allAvailableProperties.find(p => p.id === propertyId)
        ).filter(Boolean);
        
        if (favoriteProperties.length > 0) {
          favoritesData.push({
            user,
            properties: favoriteProperties,
            totalFavorites: propertyIds.length
          });
        }
      }
    });
    
    return favoritesData;
  };

  const userFavoritesData = getUserFavoritesWithDetails();

  useEffect(() => {
    // Update stats
    dispatch(updateStats({
      totalProperties: allProperties.length + managedProperties.length,
      totalInquiries: userInquiries.length,
      totalUsers: users.length
    }));
  }, [allProperties, managedProperties, userInquiries, users, dispatch]);

  const handlePropertySubmit = (e) => {
    e.preventDefault();
    
    const newProperty = {
      ...propertyForm,
      price: parseInt(propertyForm.price),
      bedrooms: parseInt(propertyForm.bedrooms),
      bathrooms: parseInt(propertyForm.bathrooms),
      area: parseInt(propertyForm.area),
      images: propertyForm.images.length > 0 ? propertyForm.images : [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      coordinates: { lat: 40.7505 + Math.random() * 0.1, lng: -73.9934 + Math.random() * 0.1 }
    };

    dispatch(addProperty(newProperty));
    dispatch(addRecentActivity({
      id: Date.now(),
      type: 'property_added',
      message: `Added new property: ${newProperty.title}`,
      timestamp: new Date().toISOString()
    }));

    setShowAddProperty(false);
    setPropertyForm({
      title: '',
      type: 'apartment',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      location: '',
      address: '',
      description: '',
      amenities: [],
      images: []
    });
  };

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      dispatch(deleteProperty(propertyId));
      dispatch(addRecentActivity({
        id: Date.now(),
        type: 'property_deleted',
        message: `Deleted property`,
        timestamp: new Date().toISOString()
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setPropertyForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageAdd = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      setPropertyForm(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }));
    }
  };

  const handleImageRemove = (index) => {
    setPropertyForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const recentInquiries = userInquiries.slice(0, 5);
  const recentUsers = users.slice(-5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {currentUser?.name}</p>
            </div>
            <button
              onClick={() => setShowAddProperty(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Property</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">User Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{userFavoritesData.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'properties', label: 'Properties' },
                { id: 'inquiries', label: 'Inquiries' },
                { id: 'users', label: 'Users' },
                { id: 'favorites', label: 'User Favorites' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Inquiries */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
                    <div className="space-y-3">
                      {recentInquiries.length > 0 ? recentInquiries.map(inquiry => (
                        <div key={inquiry.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{inquiry.name}</p>
                              <p className="text-sm text-gray-600">{inquiry.email}</p>
                              <p className="text-sm text-gray-500 mt-1">{inquiry.message}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              inquiry.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {inquiry.status}
                            </span>
                          </div>
                        </div>
                      )) : (
                        <p className="text-gray-500 text-center py-4">No inquiries yet</p>
                      )}
                    </div>
                  </div>

                  {/* Recent Users */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
                    <div className="space-y-3">
                      {recentUsers.map(user => (
                        <div key={user.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Managed Properties</h3>
                  <p className="text-sm text-gray-600">{managedProperties.length} properties</p>
                </div>

                {managedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {managedProperties.map(property => (
                      <div key={property.id} className="bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-blue-600">
                              ${property.price.toLocaleString()}
                            </span>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>{property.bedrooms} beds</span>
                              <span>{property.bathrooms} baths</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm">
                              <Eye className="w-4 h-4 inline mr-1" />
                              View
                            </button>
                            <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-md hover:bg-gray-700 transition-colors text-sm">
                              <Edit className="w-4 h-4 inline mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors text-sm"
                            >
                              <Trash2 className="w-4 h-4 inline mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first property</p>
                    <button
                      onClick={() => setShowAddProperty(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Property
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">All Inquiries</h3>
                {userInquiries.length > 0 ? (
                  <div className="space-y-4">
                    {userInquiries.map(inquiry => (
                      <div key={inquiry.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{inquiry.name}</h4>
                            <p className="text-sm text-gray-600">{inquiry.email} • {inquiry.phone}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              inquiry.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {inquiry.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(inquiry.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Property:</strong> {inquiry.propertyTitle}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Preferred Contact:</strong> {inquiry.preferredContact}
                          </p>
                          {inquiry.tourDate && (
                            <p className="text-sm text-gray-700 mb-2">
                              <strong>Tour Date:</strong> {inquiry.tourDate}
                            </p>
                          )}
                          <p className="text-sm text-gray-700">
                            <strong>Message:</strong> {inquiry.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
                    <p className="text-gray-600">Inquiries will appear here when users contact you</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">All Users</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map(user => (
                    <div key={user.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="text-sm text-gray-900">{user.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Role:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Favorites:</span>
                          <span className="text-sm text-gray-900">
                            {userFavorites[user.id]?.length || 0} properties
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Joined:</span>
                          <span className="text-sm text-gray-900">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">User Favorites</h3>
                {userFavoritesData.length > 0 ? (
                  <div className="space-y-6">
                    {userFavoritesData.map(({ user, properties, totalFavorites }) => (
                      <div key={user.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{user.name}</h4>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium text-gray-900">
                                {totalFavorites} favorite{totalFavorites !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {properties.map(property => (
                            <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-3">
                                <h5 className="font-medium text-gray-900 mb-1 text-sm">{property.title}</h5>
                                <div className="flex items-center text-gray-600 mb-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  <span className="text-xs">{property.location}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-blue-600">
                                    ${property.price.toLocaleString()}
                                  </span>
                                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <span>{property.bedrooms}bd</span>
                                    <span>{property.bathrooms}ba</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No user favorites yet</h3>
                    <p className="text-gray-600">User favorites will appear here when users save properties</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowAddProperty(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Property</h3>
                <button
                  onClick={() => setShowAddProperty(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handlePropertySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter property title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type *
                    </label>
                    <select
                      required
                      value={propertyForm.type}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      required
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, bedrooms: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Number of bedrooms"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      required
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, bathrooms: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Number of bathrooms"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area (sq ft) *
                    </label>
                    <input
                      type="number"
                      required
                      value={propertyForm.area}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Area in square feet"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={propertyForm.address}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full street address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={propertyForm.description}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the property..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {amenitiesList.map(amenity => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={propertyForm.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Images
                  </label>
                  <div className="space-y-3">
                    {propertyForm.images.map((image, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img src={image} alt={`Property ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                        <span className="flex-1 text-sm text-gray-600 truncate">{image}</span>
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleImageAdd}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Add Image URL</span>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddProperty(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-emerald-700 transition-all"
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;