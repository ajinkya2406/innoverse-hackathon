import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const getDashboardStats = createAsyncThunk(
  'dashboard/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/dashboard/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  stats: null,
  recentTransactions: [],
  upcomingEvents: [],
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.recentTransactions = action.payload.recentTransactions;
        state.upcomingEvents = action.payload.upcomingEvents;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch dashboard stats';
      });
  }
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
