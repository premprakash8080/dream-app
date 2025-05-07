import React from 'react';

const AuthFormLayout = ({ 
  title, 
  subtitle, 
  children, 
  footerText, 
  footerActionText, 
  onFooterAction 
}) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="space-y-6">
        {children}
        
        {footerText && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {footerText}{' '}
              <button
                type="button"
                onClick={onFooterAction}
                className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                {footerActionText}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFormLayout; 