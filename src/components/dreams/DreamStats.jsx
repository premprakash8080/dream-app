import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired
};

const DreamStats = ({ dreams }) => {
  const stats = {
    total: dreams.length,
    answered: dreams.filter(dream => dream.status === 'approved' || dream.status === 'rejected').length,
    pending: dreams.filter(dream => dream.status === 'pending').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        title="Total Dreams"
        value={stats.total}
        icon={
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        }
        color="text-purple-600"
      />
      <StatCard
        title="Answered Dreams"
        value={stats.answered}
        icon={
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
        color="text-green-600"
      />
      <StatCard
        title="Pending Dreams"
        value={stats.pending}
        icon={
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        color="text-yellow-600"
      />
    </div>
  );
};

DreamStats.propTypes = {
  dreams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default DreamStats; 