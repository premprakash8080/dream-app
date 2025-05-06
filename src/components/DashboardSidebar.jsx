import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon, label, to, badge, isExpanded = false, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <div className="relative">
            <Link
                to={to}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${isActive
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
            >
                <div className="flex items-center justify-center w-6 h-6 mr-3">
                    {icon}
                </div>
                <span className="font-medium">{label}</span>
                {badge && (
                    <span className="ml-auto px-2 py-1 text-xs font-bold text-purple-700 bg-purple-100 rounded-full">
                        {badge}
                    </span>
                )}
            </Link>
            {isExpanded && children && (
                <div className="mt-1 ml-6 space-y-1">
                    {children}
                </div>
            )}
        </div>
    );
};

const DashboardSidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto p-4">

            <nav className="p-4 space-y-2">
                <SidebarItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    }
                    label="All Dreams"
                    to="/dreams"
                    badge="14"
                />

                <SidebarItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    }
                    label="My Dreams"
                    to="/my-dreams"
                />

                <SidebarItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    }
                    label="Add Dream"
                    to="/add-dream"
                />

                <SidebarItem
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    }
                    label="Favourite Dreams"
                    to="/favourites"
                    badge="3"
                />

                <div className="pt-4 mt-4 border-t border-gray-200">
                    <SidebarItem
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }
                        label="Profile"
                        to="/profile"
                    />

                    <SidebarItem
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        }
                        label="Logout"
                        to="/logout"
                    />
                </div>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;