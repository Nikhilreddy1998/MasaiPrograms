export const applyFilters = (properties, filters) => {
  return properties.filter(property => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = `${property.title} ${property.description} ${property.location} ${property.amenities.join(' ')}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      if (!property.location.toLowerCase().includes(locationQuery) && 
          !property.address.toLowerCase().includes(locationQuery)) {
        return false;
      }
    }

    // Property type filter
    if (filters.propertyType && filters.propertyType !== 'all') {
      if (property.type !== filters.propertyType) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const bedroomCount = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms);
      if (filters.bedrooms === '5+') {
        if (property.bedrooms < 5) {
          return false;
        }
      } else {
        if (property.bedrooms !== bedroomCount) {
          return false;
        }
      }
    }

    // Bathrooms filter
    if (filters.bathrooms && filters.bathrooms !== 'any') {
      const bathroomCount = filters.bathrooms === '4+' ? 4 : parseInt(filters.bathrooms);
      if (filters.bathrooms === '4+') {
        if (property.bathrooms < 4) {
          return false;
        }
      } else {
        if (property.bathrooms !== bathroomCount) {
          return false;
        }
      }
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    return true;
  });
};

export const sortProperties = (properties, sortBy) => {
  const sorted = [...properties];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    case 'bedrooms':
      return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    case 'area':
      return sorted.sort((a, b) => b.area - a.area);
    default:
      return sorted;
  }
};