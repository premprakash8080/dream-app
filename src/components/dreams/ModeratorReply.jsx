import React from 'react';
import PropTypes from 'prop-types';

const ModeratorReply = ({ reply }) => {
  if (!reply) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-center italic">
            No reply yet from the moderator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 rounded-lg border border-purple-100">
      {/* Moderator Info Header */}
      <div className="p-4 border-b border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-medium">
              {reply.moderator?.avatar || 'M'}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {reply.moderator?.name || 'Moderator'}
            </h4>
            <time 
              dateTime={reply.createdAt}
              className="text-sm text-gray-500"
            >
              {new Date(reply.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>
      
      {/* Reply Content */}
      <div className="p-4">
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {reply.content}
        </p>
      </div>
    </div>
  );
};

ModeratorReply.propTypes = {
  reply: PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    moderator: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  })
};

export default ModeratorReply; 