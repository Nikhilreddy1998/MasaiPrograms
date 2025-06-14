import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ArrowLeft, Heart, GitCompare, Share2, Calendar, MapPin, 
  Bed, Bath, Square, Car, Wifi, Dumbbell, Waves, TreePine,
  Phone, Mail, MessageCircle, CheckCircle, X
} from 'lucide-react';
import { setCurrentProperty } from '../store/slices/propertiesSlice.js';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice.js';
import { addToComparison, removeFromComparison } from '../store/slices/comparisonSlice.js';
import ImageCarousel from '../components/ImageCarousel.jsx';
import ContactForm from '../components/ContactForm.jsx';
import PropertyMap from '../components/PropertyMap.jsx';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { allProperties, currentProperty } = useSelector(state => state.properties);
  const { favorites } = useSelector(state => state.favorites);
  const { comparisonList } = useSelector(state => state.comparison);

  const property = currentProperty || allProperties.find(p => p.id === parseInt(id));
  const isFavorite = favorites.includes(property?.id);
  const isInComparison = comparisonList.includes(property?.id);

  useEffect(() => {
    if (property) {
      dispatch(setCurrentProperty(property));
      document.title = `${property.title} - PropertyHub`;
    }
  }, [property, dispatch]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(property.id));
    } else {
      dispatch(addToFavorites(property.id));
    }
  };

  const handleComparisonClick = () => {
    if (isInComparison) {
      dispatch(removeFromComparison(property.id));
    } else {
      dispatch(addToComparison(property.id));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const amenityIcons = {
    'Pool': Waves,
    'Gym': Dumbbell,
    'Parking': Car,
    'Garden': TreePine,
    'Garage': Car,
    'Wifi': Wifi,
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Properties</span>
            </Link>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleComparisonClick}
                className={`p-2 rounded-lg transition-colors ${
                  isInComparison 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-600 hover:text-emerald-500 hover:bg-emerald-50'
                }`}
              >
                <GitCompare className="w-5 h-5" />
              </button>
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <ImageCarousel images={property.images} title={property.title} />

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Listed {new Date(property.dateAdded).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.type}</div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {['overview', 'amenities', 'location'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map(amenity => {
                      const IconComponent = amenityIcons[amenity] || CheckCircle;
                      return (
                        <div key={amenity} className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                  <PropertyMap properties={[property]} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{property.agent.name}</div>
                  <div className="text-sm text-gray-600">Licensed Real Estate Agent</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a 
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{property.agent.phone}</span>
                </a>
                <a 
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{property.agent.email}</span>
                </a>
              </div>

              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  Schedule Tour
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Calculate Mortgage
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Get Market Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          property={property}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetailsPage;