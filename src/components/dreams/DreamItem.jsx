import React from 'react';
import PropTypes from 'prop-types';

const DreamItem = ({ dream, onClick, viewType = 'card' }) => {
  const isUrgent = dream.status === 'pending' && new Date(dream.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Base styles for both views
  const baseStyles = "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer";
  
  // View-specific container styles
  const containerStyles = {
    card: "p-6 flex gap-6",
    list: "flex gap-4 p-4"
  };

  // Image container styles based on view type
  const imageContainerStyles = {
    card: "w-[30%] h-48 flex-shrink-0",
    list: "w-24 h-24 flex-shrink-0"
  };

  // Content container styles based on view type
  const contentContainerStyles = {
    card: "w-[70%] flex flex-col",
    list: "flex-grow min-w-0"
  };

  return (
    <article
      onClick={onClick}
      className={`${baseStyles} ${containerStyles[viewType]}`}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {/* Image/Avatar Section */}
      <div className={imageContainerStyles[viewType]}>
        <div 
          className="w-full h-full rounded-lg bg-purple-100 flex items-center justify-center"
          aria-label={`${dream.user?.name}'s avatar`}
        >
          <span className={`text-purple-600 font-medium ${viewType === 'card' ? 'text-4xl' : 'text-2xl'}`}>
            {dream.user?.avatar}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className={contentContainerStyles[viewType]}>
        {/* Status Badge */}
        <div className="mb-2">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
              isUrgent
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {isUrgent ? 'Urgent' : 'Normal'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {dream.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {dream.description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
          <time 
            dateTime={dream.createdAt}
            className="whitespace-nowrap"
          >
            {new Date(dream.createdAt).toLocaleDateString()}
          </time>
          
          {viewType === 'card' && (
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>View Details</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

DreamItem.propTypes = {
  dream: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  viewType: PropTypes.oneOf(['card', 'list'])
};

export default DreamItem; 