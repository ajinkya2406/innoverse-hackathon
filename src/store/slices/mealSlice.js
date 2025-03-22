import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  meals: [],
  userMeals: [],
  tokens: [],
  loading: false,
  error: null,
  success: null
};

const mealSlice = createSlice({
  name: 'meal',
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
    setMeals: (state, action) => {
      state.loading = false;
      state.meals = action.payload;
    },
    setUserMeals: (state, action) => {
      state.loading = false;
      state.userMeals = action.payload;
    },
    setTokens: (state, action) => {
      state.loading = false;
      state.tokens = action.payload;
    },
    addMeal: (state, action) => {
      state.loading = false;
      state.meals.push(action.payload);
    },
    updateMealData: (state, action) => {
      state.loading = false;
      const index = state.meals.findIndex(meal => meal._id === action.payload._id);
      if (index !== -1) {
        state.meals[index] = action.payload;
      }
    },
    updateToken: (state, action) => {
      state.loading = false;
      const index = state.tokens.findIndex(token => token._id === action.payload._id);
      if (index !== -1) {
        state.tokens[index] = action.payload;
      }
    }
  }
});

export const {
  setLoading,
  setError,
  setSuccess,
  clearError,
  clearSuccess,
  setMeals,
  setUserMeals,
  setTokens,
  addMeal,
  updateMealData,
  updateToken
} = mealSlice.actions;

// Thunk actions
export const getAllMeals = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get('/api/meals');
    dispatch(setMeals(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch meals'));
  }
};

export const getUserMeals = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get('/api/meals/user');
    dispatch(setUserMeals(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch user meals'));
  }
};

export const getMealsByVendor = (vendorId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get(`/api/vendors/${vendorId}/meals`);
    dispatch(setMeals(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch vendor meals'));
  }
};

export const createMeal = (mealData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.post('/api/meals', mealData);
    dispatch(addMeal(response.data));
    dispatch(setSuccess('Meal created successfully'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to create meal'));
  }
};

export const updateMeal = (mealId, mealData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.put(`/api/meals/${mealId}`, mealData);
    dispatch(updateMealData(response.data));
    dispatch(setSuccess('Meal updated successfully'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to update meal'));
  }
};

export const createMealOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.post('/api/meals/order', orderData);
    dispatch(getUserMeals());
    dispatch(setSuccess('Order placed successfully'));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to place order'));
    throw error;
  }
};

export const getMyTokens = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get('/api/meals/tokens');
    dispatch(setTokens(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch tokens'));
  }
};

export const cancelToken = (tokenId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.post(`/api/meals/tokens/${tokenId}/cancel`);
    dispatch(updateToken(response.data));
    dispatch(setSuccess('Token cancelled successfully'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to cancel token'));
  }
};

export default mealSlice.reducer;
