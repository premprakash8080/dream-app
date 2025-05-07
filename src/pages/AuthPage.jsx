import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignupForm from '../features/auth/SignupForm';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine initial mode from URL or default to signup
  const initialMode = location.pathname === '/login' ? 'login' : 'signup';
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            DreamScape
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Your journey into dream interpretation begins here
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignupForm 
            isLogin={initialMode === 'login'} 
            onClose={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 