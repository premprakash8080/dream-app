import React from 'react';

const DreamListItem = ({ dream, onClick }) => {
  const isUrgent = dream.status === 'pending' && new Date(dream.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <article
      onClick={onClick}
      className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {/* Left Column - Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <div 
          className="w-full h-full rounded-lg bg-purple-100 flex items-center justify-center"
          aria-label={`${dream.user?.name}'s avatar`}
        >
          <span className="text-2xl text-purple-600 font-medium">
            {dream.user?.avatar}
          </span>
        </div>
      </div>

      {/* Right Column - Content */}
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-grow min-w-0">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap mb-2 ${
                isUrgent
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {isUrgent ? 'Urgent' : 'Normal'}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {dream.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {dream.description}
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <time 
            dateTime={dream.createdAt}
            className="text-sm text-gray-500 whitespace-nowrap"
          >
            {new Date(dream.createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>
    </article>
  );
};

export default DreamListItem; 