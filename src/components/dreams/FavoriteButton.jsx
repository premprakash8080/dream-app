import React from 'react';
import PropTypes from 'prop-types';

const FavoriteButton = ({ isFavourite, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors group relative"
      aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`w-6 h-6 ${
          isFavourite ? 'text-yellow-500 fill-current' : 'text-gray-400'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isFavourite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  );
};

FavoriteButton.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default FavoriteButton; 