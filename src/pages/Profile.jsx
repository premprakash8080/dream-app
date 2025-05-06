import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../features/auth/authSlice';
import { loadMyDreams } from '../features/dreams/myDreamSlice';
import RecentActivity from '../components/RecentActivity';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, profile, profileLoading, profileError } = useSelector((state) => state.auth);
  const { dreams } = useSelector((state) => state.myDreams);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProfile(user.id));
      dispatch(loadMyDreams({ page: 1, limit: 20 }));
    }
  }, [dispatch, user?.id]);

  // Build activity list
  const activities = [];
  dreams.forEach((dream) => {
    // Added
    activities.push({
      type: 'added',
      dream,
      timestamp: dream.createdAt,
    });
    // Favourited
    if (dream.isFavourite) {
      activities.push({
        type: 'favourited',
        dream,
        timestamp: dream.createdAt, // Or use a separate favouritedAt if available
      });
    }
    // Answered
    if (dream.status === 'answered' && dream.moderatorReply?.createdAt) {
      activities.push({
        type: 'answered',
        dream,
        timestamp: dream.moderatorReply.createdAt,
      });
    }
  });

  // Sort by timestamp, most recent first
  activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (profileLoading) {
    return <div className="p-6">Loading profile...</div>;
  }
  if (profileError) {
    return <div className="p-6 text-red-600">Error: {profileError}</div>;
  }
  if (!profile) {
    return <div className="p-6">No profile data.</div>;
  }

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
                {profile?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
              <p className="text-gray-600">{profile?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
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
                    <p className="mt-1 text-gray-900">{profile?.name}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-gray-900">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Country</label>
                    <p className="mt-1 text-gray-900">{profile?.country || 'Not specified'}</p>
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
              <RecentActivity activities={activities.slice(0, 8)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 