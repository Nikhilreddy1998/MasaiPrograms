import React from 'react';
import { Search, MapPin, TrendingUp, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-gradient text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 fade-in">
            Find Your Perfect
            <span className="block text-emerald-200">Dream Home</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto fade-in">
            Discover thousands of premium properties with advanced search, 
            detailed insights, and personalized recommendations.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 fade-in">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 inline-block">
                <Search className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-blue-100 text-sm">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 inline-block">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-blue-100 text-sm">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 inline-block">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-blue-100 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 inline-block">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-blue-100 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;