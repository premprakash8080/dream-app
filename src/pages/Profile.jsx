import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, resetProfileState } from '../features/auth/authSlice';
import { loadMyDreams } from '../features/dreams/myDreamSlice';
import RecentActivity from '../components/RecentActivity';

const Profile = () => {
  const dispatch = useDispatch();
  const { 
    user, 
    profile, 
    profileLoading, 
    profileError,
    isAuthenticated,
    profileRetryCount 
  } = useSelector((state) => state.auth);
  const { dreams } = useSelector((state) => state.myDreams);

  const loadProfile = useCallback(() => {
    if (user?.id && isAuthenticated) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      loadProfile();
      dispatch(loadMyDreams({ page: 1, limit: 20 }));
    }
    return () => {
      dispatch(resetProfileState());
    };
  }, [dispatch, user?.id, isAuthenticated, loadProfile]);

  // Retry loading profile if failed and retry count is less than 3
  useEffect(() => {
    if (profileError && profileRetryCount < 3) {
      const timer = setTimeout(() => {
        loadProfile();
      }, 2000 * (profileRetryCount + 1)); // Exponential backoff
      return () => clearTimeout(timer);
    }
  }, [profileError, profileRetryCount, loadProfile]);

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
        timestamp: dream.createdAt,
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

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Please log in to view your profile</h2>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800">Error Loading Profile</h2>
          <p className="text-red-600 mt-2">{profileError}</p>
          {profileRetryCount < 3 && (
            <p className="text-gray-600 mt-2">Retrying in a few seconds...</p>
          )}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Profile Not Found</h2>
        <p className="text-gray-600 mt-2">We couldn't find your profile information.</p>
      </div>
    );
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