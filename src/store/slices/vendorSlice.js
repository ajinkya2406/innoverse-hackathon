import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllVendors = createAsyncThunk(
  'vendors/getAllVendors',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('/api/vendors', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVendorProfile = createAsyncThunk(
  'vendors/getVendorProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('/api/vendors/profile', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVendorProfile = createAsyncThunk(
  'vendors/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.put('/api/vendors/profile', profileData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVendorStatus = createAsyncThunk(
  'vendors/updateStatus',
  async (status, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.patch('/api/vendors/profile/status', { status }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVendorTransactions = createAsyncThunk(
  'vendors/getTransactions',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get(
        `/api/vendors/transactions?page=${page}&limit=${limit}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const requestWithdrawal = createAsyncThunk(
  'vendors/requestWithdrawal',
  async (amount, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('/api/vendors/withdraw', { amount }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  vendors: [],
  vendorProfile: null,
  transactions: [],
  totalTransactions: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  successMessage: null
};

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all vendors cases
      .addCase(getAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(getAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch vendors';
      })
      // Get vendor profile cases
      .addCase(getVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProfile = action.payload;
      })
      .addCase(getVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch vendor profile';
      })
      // Update vendor profile cases
      .addCase(updateVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProfile = action.payload;
        state.successMessage = 'Profile updated successfully';
      })
      .addCase(updateVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update profile';
      })
      // Update vendor status cases
      .addCase(updateVendorStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProfile = action.payload;
        state.successMessage = 'Status updated successfully';
      })
      .addCase(updateVendorStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update status';
      })
      // Get vendor transactions cases
      .addCase(getVendorTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.totalTransactions = action.payload.totalTransactions;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getVendorTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch transactions';
      })
      // Request withdrawal cases
      .addCase(requestWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Withdrawal request submitted successfully';
      })
      .addCase(requestWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to request withdrawal';
      });
  }
});

export const { clearError, clearSuccess } = vendorSlice.actions;
export default vendorSlice.reducer;
