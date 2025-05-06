import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loadDreams, 
  selectFilteredDreams, 
  selectDreamStatus, 
  selectDreamError,
  selectDreamPagination,
  DREAM_STATUS,
  setFilters,
  setSelectedDream
} from '../features/dreams/dreamSlice';
import RightSidebar from '../components/RightSidebar';
import DreamItem from '../components/dreams/DreamItem';
import DreamDetails from '../components/dreams/DreamDetails';
import Pagination from '../components/common/Pagination';

const FavouriteDreams = () => {
  const dispatch = useDispatch();
  const dreams = useSelector(selectFilteredDreams) || [];
  const status = useSelector(selectDreamStatus);
  const error = useSelector(selectDreamError);
  const pagination = useSelector(selectDreamPagination) || { currentPage: 1, totalPages: 1 };
  const selectedDream = useSelector(state => state.dreams.selectedDream);
  const [viewMode, setViewMode] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(loadDreams({ 
      page: pagination.currentPage, 
      limit: pageSize,
      isFavourite: true 
    }));
  }, [dispatch, pagination.currentPage, pageSize]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    dispatch(setFilters({ search: value }));
  };

  const handleDreamClick = (dream) => {
    dispatch(setSelectedDream(dream));
  };

  const handleCloseSidebar = () => {
    dispatch(setSelectedDream(null));
  };

  const handlePageChange = (page) => {
    dispatch(loadDreams({ 
      page, 
      limit: pageSize,
      isFavourite: true 
    }));
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    // Reset to first page when changing page size
    dispatch(loadDreams({ 
      page: 1, 
      limit: newSize,
      isFavourite: true 
    }));
  };

  if (status === DREAM_STATUS.LOADING) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (status === DREAM_STATUS.FAILED) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Search and View Toggle */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Favourite Dreams</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search dreams..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'card' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
              aria-label="Card view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dreams Display */}
      {dreams.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No favourite dreams found. Try adjusting your search.
        </div>
      ) : (
        <>
          <div className={viewMode === 'card' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
            {dreams.map((dream) => (
              <DreamItem
                key={dream.id}
                dream={dream}
                onClick={() => handleDreamClick(dream)}
                viewType={viewMode}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      )}

      {/* Right Sidebar */}
      <RightSidebar
        isOpen={!!selectedDream}
        onClose={handleCloseSidebar}
      >
        {selectedDream && <DreamDetails dream={selectedDream} />}
      </RightSidebar>
    </div>
  );
};

export default FavouriteDreams; 