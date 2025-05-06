import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { dreams } = useSelector((state) => state.dreams);

  const stats = {
    total: dreams.length,
    approved: dreams.filter(dream => dream.status === 'approved').length,
    pending: dreams.filter(dream => dream.status === 'pending').length,
    rejected: dreams.filter(dream => dream.status === 'rejected').length,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Profile Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-3xl text-purple-600 font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Information */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">Full Name</label>
                    <p className="mt-1 text-gray-900">{user?.name}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Country</label>
                    <p className="mt-1 text-gray-900">{user?.country || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Dreams</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="text-2xl font-semibold text-green-600">{stats.approved}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Rejected</p>
                    <p className="text-2xl font-semibold text-red-600">{stats.rejected}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div>
                {dreams.slice(0, 5).map((dream) => (
                  <div key={dream.id} className="mb-4 last:mb-0 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{dream.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(dream.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      dream.status === 'approved' ? 'bg-green-100 text-green-800' :
                      dream.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dream.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 