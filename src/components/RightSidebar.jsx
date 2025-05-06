import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RightSidebar = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-1/2 bg-white shadow-lg z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            {/* Header - Fixed */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Dream Details</h2>
                <button 
                  onClick={onClose} 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close sidebar"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="h-[calc(100%-4rem)] overflow-y-auto">
              <div className="px-8 py-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RightSidebar;
