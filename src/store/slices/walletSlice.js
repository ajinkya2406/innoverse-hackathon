import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const getWalletBalance = createAsyncThunk(
  'wallet/getBalance',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('/api/wallet/balance', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMoney = createAsyncThunk(
  'wallet/addMoney',
  async (amount, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('/api/wallet/deposit', { amount }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const makePayment = createAsyncThunk(
  'wallet/makePayment',
  async ({ amount, description, vendorId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('/api/wallet/pay', {
        amount,
        description,
        vendorId
      }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTransactions = createAsyncThunk(
  'wallet/getTransactions',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get(
        `/api/wallet/transactions?page=${page}&limit=${limit}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  balance: 0,
  transactions: [],
  recentTransactions: [],
  totalTransactions: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get balance cases
      .addCase(getWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.recentTransactions = action.payload.recentTransactions;
      })
      .addCase(getWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to get balance';
      })
      // Add money cases
      .addCase(addMoney.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.recentTransactions = [
          action.payload.transaction,
          ...state.recentTransactions
        ].slice(0, 5);
      })
      .addCase(addMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add money';
      })
      // Make payment cases
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.recentTransactions = [
          action.payload.transaction,
          ...state.recentTransactions
        ].slice(0, 5);
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Payment failed';
      })
      // Get transactions cases
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.totalTransactions = action.payload.totalTransactions;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to get transactions';
      });
  }
});

export const { clearError } = walletSlice.actions;
export default walletSlice.reducer;
