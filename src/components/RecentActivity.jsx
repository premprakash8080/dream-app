import React from 'react';
import PropTypes from 'prop-types';

const activityIcon = (type) => {
  switch (type) {
    case 'added':
      return (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      );
    case 'favourited':
      return (
        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'answered':
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
        </svg>
      );
  }
};

const activityDescription = (dream, type) => {
  switch (type) {
    case 'added':
      return <>Added dream: <span className="font-medium">{dream.title}</span></>;
    case 'favourited':
      return <>Favorited dream: <span className="font-medium">{dream.title}</span></>;
    case 'answered':
      return <>Dream answered: <span className="font-medium">{dream.title}</span></>;
    default:
      return <>Updated dream: <span className="font-medium">{dream.title}</span></>;
  }
};

const RecentActivity = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <div className="text-gray-500">No recent activity.</div>;
  }

  return (
    <ul className="space-y-4">
      {activities.map((activity, idx) => (
        <li key={idx} className="flex items-center gap-3">
          <span>{activityIcon(activity.type)}</span>
          <div className="flex-1">
            <div className="text-gray-900 text-sm">{activityDescription(activity.dream, activity.type)}</div>
            <div className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

RecentActivity.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['added', 'favourited', 'answered']).isRequired,
      dream: PropTypes.object.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ),
};

export default RecentActivity;
