import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyDreams } from '../../api/dreamApi';

// Types
export const MY_DREAMS_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
};

// Async thunks
export const loadMyDreams = createAsyncThunk(
  'myDreams/load',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await getMyDreams({ page, limit });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load dreams');
    }
  }
);

const initialState = {
  dreams: [],
  status: MY_DREAMS_STATUS.IDLE,
  error: null,
  selectedDream: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  },
  stats: {
    total: 0,
    answered: 0,
    pending: 0
  }
};

const myDreamSlice = createSlice({
  name: 'myDreams',
  initialState,
  reducers: {
    setSelectedDream: (state, action) => {
      state.selectedDream = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMyDreams.pending, (state) => {
        state.status = MY_DREAMS_STATUS.LOADING;
        state.error = null;
      })
      .addCase(loadMyDreams.fulfilled, (state, action) => {
        state.status = MY_DREAMS_STATUS.SUCCEEDED;
        state.dreams = action.payload.dreams;
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.total
        };
        state.stats = {
          total: action.payload.total,
          answered: action.payload.dreams.filter(dream => dream.status === 'answered').length,
          pending: action.payload.dreams.filter(dream => dream.status === 'pending').length
        };
      })
      .addCase(loadMyDreams.rejected, (state, action) => {
        state.status = MY_DREAMS_STATUS.FAILED;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectMyDreams = (state) => state.myDreams.dreams;
export const selectMyDreamsStatus = (state) => state.myDreams.status;
export const selectMyDreamsError = (state) => state.myDreams.error;
export const selectSelectedMyDream = (state) => state.myDreams.selectedDream;
export const selectMyDreamsPagination = (state) => state.myDreams.pagination;
export const selectMyDreamsStats = (state) => state.myDreams.stats;

export const { setSelectedDream } = myDreamSlice.actions;
export default myDreamSlice.reducer; 