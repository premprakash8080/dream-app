
import React from 'react';

const DreamCard = ({ dream, onClick }) => {
  const isUrgent = dream.status === 'pending' && new Date(dream.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="p-6">
        {/* Status Badge */}
        <div className="mb-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
              isUrgent
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {isUrgent ? 'Urgent' : 'Normal'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3">
          {dream.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 line-clamp-3 mb-4">
          {dream.description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <time dateTime={dream.createdAt}>
            {new Date(dream.createdAt).toLocaleDateString()}
          </time>
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
        </div>
      </div>
    </article>
  );
};

export default DreamCard; 