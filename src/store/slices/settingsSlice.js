import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  settings: null,
  loading: false,
  error: null,
  success: null
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    setSettings: (state, action) => {
      state.loading = false;
      state.settings = action.payload;
    }
  }
});

export const {
  setLoading,
  setError,
  setSuccess,
  clearError,
  clearSuccess,
  setSettings
} = settingsSlice.actions;

// Thunk actions
export const getSettings = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get('/api/settings');
    dispatch(setSettings(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch settings'));
  }
};

export const updateSettings = (settingsData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.put('/api/settings', settingsData);
    dispatch(setSettings(response.data));
    dispatch(setSuccess('Settings updated successfully'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to update settings'));
  }
};

export default settingsSlice.reducer;
