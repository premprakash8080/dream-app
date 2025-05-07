import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser, getUserProfile, signupUser } from '../../api/authApi';

// Helper to check token validity
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    // Add any token validation logic here if needed
    return true;
  } catch (error) {
    return false;
  }
};

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await signupUser(name, email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.token || localStorage.getItem('token');
      
      if (!token || !isTokenValid(token)) {
        throw new Error('Invalid or expired authentication token');
      }

      const profile = await getUserProfile(userId);
      if (!profile) {
        throw new Error('Profile data not found');
      }
      
      return profile;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Initialize state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem('token');
  return {
    user: null,
    token,
    isAuthenticated: !!token && isTokenValid(token),
    loading: false,
    error: null,
    profile: null,
    profileLoading: false,
    profileError: null,
    profileRetryCount: 0,
    lastProfileFetch: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.profileError = null;
    },
    resetProfileState: (state) => {
      state.profile = null;
      state.profileLoading = false;
      state.profileError = null;
      state.profileRetryCount = 0;
      state.lastProfileFetch = null;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.profileError = null;
        state.profileRetryCount = 0;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.profile = null;
        state.profileLoading = false;
        state.profileError = null;
        state.profileRetryCount = 0;
        state.lastProfileFetch = null;
      })
      // Profile fetch
      .addCase(fetchProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
        state.profileRetryCount = 0;
        state.lastProfileFetch = Date.now();
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
        state.profileRetryCount += 1;
        
        // If token is invalid, clear authentication
        if (action.payload?.includes('Invalid or expired authentication token')) {
          state.isAuthenticated = false;
          state.token = null;
          localStorage.removeItem('token');
        }
      });
  }
});

export const { clearError, resetProfileState, updateProfile } = authSlice.actions;
export default authSlice.reducer; 