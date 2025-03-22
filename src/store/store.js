import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import walletReducer from './slices/walletSlice';
import vendorReducer from './slices/vendorSlice';
import mealReducer from './slices/mealSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    wallet: walletReducer,
    vendor: vendorReducer,
    meal: mealReducer,
    settings: settingsReducer
  }
});

export { store };
export default store;
