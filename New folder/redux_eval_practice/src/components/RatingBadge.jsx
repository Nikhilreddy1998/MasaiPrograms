import React from 'react';

function RatingBadge({ rating, size = 'md' }) {
  let backgroundColor = '#9E9E9E'; // Default gray for special cases
  let textColor = 'white';

  if (rating === '5') {
    backgroundColor = '#4CAF50'; // Green for excellent
  } else if (rating === '4' || rating === '3') {
    backgroundColor = '#FF9800'; // Orange for good/satisfactory
  } else if (rating === '2' || rating === '1' || rating === '0') {
    backgroundColor = '#F44336'; // Red for improvement needed
  } else if (rating === 'Exempt') {
    backgroundColor = '#607D8B'; // Blue-gray for exempt
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <span
      className={`inline-block rounded-md font-semibold ${sizeClasses[size]}`}
      style={{ backgroundColor, color: textColor }}
    >
      {rating === 'Awaiting Inspection' ? 'Pending' : rating}
    </span>
  );
}

export default RatingBadge;