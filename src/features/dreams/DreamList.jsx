import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loadDreams, 
  selectFilteredDreams, 
  selectDreamStatus, 
  selectDreamError,
  DREAM_STATUS,
  setFilters
} from './dreamSlice';

const DreamList = () => {
  const dispatch = useDispatch();
  const dreams = useSelector(selectFilteredDreams);
  const status = useSelector(selectDreamStatus);
  const error = useSelector(selectDreamError);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === DREAM_STATUS.IDLE) {
      dispatch(loadDreams());
    }
  }, [status, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setFilters({ search: value }));
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-purple">Dream Interpretations</h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search dreams..."
            className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {dreams.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No dreams found. Try adjusting your search.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dreams.map((dream) => (
            <div 
              key={dream.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-brand-purple mb-2">
                {dream.title}
              </h3>
              <p className="text-gray-600 mb-4">{dream.meaning}</p>
              {dream.category && (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  {dream.category}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DreamList;
