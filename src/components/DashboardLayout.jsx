import React, { useRef, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';

const HEADER_HEIGHT = 64; // 16 * 4 (tailwind h-16)

const DashboardLayout = ({ children, sidebarOpen, onSidebarClose }) => {
  const sidebarRef = useRef(null);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Trap focus inside sidebar when open (accessibility)
  useEffect(() => {
    if (!sidebarOpen || !sidebarRef.current) return;
    const focusableEls = sidebarRef.current.querySelectorAll(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    function handleTab(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <DashboardSidebar />
      </div>

      {/* Sidebar drawer for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 flex"
          style={{ top: HEADER_HEIGHT, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        >
          <div
            ref={sidebarRef}
            className="w-64 max-w-full h-full bg-white shadow-lg relative transition-transform duration-300 transform translate-x-0"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            {/* Removed close icon for mobile */}
            <DashboardSidebar />
          </div>
          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-40 transition-opacity duration-300"
            onClick={onSidebarClose}
            aria-label="Close sidebar overlay"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout; 