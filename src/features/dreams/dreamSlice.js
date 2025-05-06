import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDreams, getFavouriteDreams, toggleFavourite } from '../../api/dreamApi';
import { createSelector } from '@reduxjs/toolkit';

// Types
export const DREAM_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
};

// Async thunks
export const loadDreams = createAsyncThunk(
  'dreams/load',
  async ({ page = 1, limit = 10, isFavourite = false }, { rejectWithValue }) => {
    try {
      const response = isFavourite 
        ? await getFavouriteDreams(page, limit)
        : await fetchDreams(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load dreams');
    }
  }
);

export const addDream = createAsyncThunk(
  'dreams/add',
  async (dreamData, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const newDream = {
        id: Date.now().toString(),
        ...dreamData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        user: {
          name: 'Current User', // This should come from auth state
          country: 'Unknown'
        }
      };
      return newDream;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add dream');
    }
  }
);

export const toggleDreamFavorite = createAsyncThunk(
  'dreams/toggleFavorite',
  async (dreamId, { rejectWithValue }) => {
    try {
      const response = await toggleFavourite(dreamId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to toggle favorite');
    }
  }
);

const initialState = {
  dreams: [],
  status: DREAM_STATUS.IDLE,
  error: null,
  selectedDream: null,
  filters: {
    search: '',
    category: 'all',
    sortBy: 'newest'
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  }
};

const dreamSlice = createSlice({
  name: 'dreams',
  initialState,
  reducers: {
    setSelectedDream: (state, action) => {
      state.selectedDream = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDreams.pending, (state) => {
        state.status = DREAM_STATUS.LOADING;
        state.error = null;
      })
      .addCase(loadDreams.fulfilled, (state, action) => {
        state.status = DREAM_STATUS.SUCCEEDED;
        state.dreams = action.payload.dreams;
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.total
        };
      })
      .addCase(loadDreams.rejected, (state, action) => {
        state.status = DREAM_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(addDream.fulfilled, (state, action) => {
        state.dreams.unshift(action.payload);
      })
      .addCase(addDream.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(toggleDreamFavorite.fulfilled, (state, action) => {
        const dream = state.dreams.find(d => d.id === action.payload.id);
        if (dream) {
          dream.isFavourite = action.payload.isFavourite;
        }
        if (state.selectedDream?.id === action.payload.id) {
          state.selectedDream.isFavourite = action.payload.isFavourite;
        }
      })
      .addCase(toggleDreamFavorite.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

// Base selectors
export const selectAllDreams = (state) => state.dreams.dreams;
export const selectDreamStatus = (state) => state.dreams.status;
export const selectDreamError = (state) => state.dreams.error;
export const selectSelectedDream = (state) => state.dreams.selectedDream;
export const selectDreamFilters = (state) => state.dreams.filters;
export const selectDreamPagination = (state) => state.dreams.pagination;

// Memoized filtered dreams selector
export const selectFilteredDreams = createSelector(
  [selectAllDreams, selectDreamFilters],
  (dreams, filters) => {
    if (!Array.isArray(dreams)) return [];
    
    return dreams
      .filter(dream => {
        const matchesSearch = dream.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                            dream.meaning?.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'all' || dream.category === filters.category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (filters.sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        return 0;
      });
  }
);

export const { setSelectedDream, setFilters, clearFilters } = dreamSlice.actions;
export default dreamSlice.reducer;
