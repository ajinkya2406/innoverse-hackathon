import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle unauthorized errors
    if (response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(
        showSnackbar({
          message: 'Your session has expired. Please log in again.',
          severity: 'error',
        })
      );
    }

    // Handle server errors
    else if (response?.status === 500) {
      store.dispatch(
        showSnackbar({
          message: 'An unexpected error occurred. Please try again later.',
          severity: 'error',
        })
      );
    }

    // Handle network errors
    else if (!response) {
      store.dispatch(
        showSnackbar({
          message: 'Network error. Please check your connection.',
          severity: 'error',
        })
      );
    }

    return Promise.reject(error);
  }
);

export default instance;
