import React from 'react';
import { Home, Key, DollarSign, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Home,
      value: '12,450',
      label: 'Properties Available',
      description: 'Curated selection of premium properties'
    },
    {
      icon: Key,
      value: '3,200',
      label: 'Properties Sold',
      description: 'Successfully matched buyers with homes'
    },
    {
      icon: DollarSign,
      value: '$2.5B',
      label: 'Total Value Traded',
      description: 'Billions in property transactions'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Customer Support',
      description: 'Always here to help you'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Property Seekers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of satisfied customers who found their perfect homes through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;