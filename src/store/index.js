import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vendorReducer from './slices/vendorSlice';
import eventReducer from './slices/eventSlice';
import mealReducer from './slices/mealSlice';
import walletReducer from './slices/walletSlice';
import uiReducer from './slices/uiSlice';
import dashboardReducer from './slices/dashboardSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    vendors: vendorReducer,
    events: eventReducer,
    meals: mealReducer,
    wallet: walletReducer,
    ui: uiReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer
  }
});

export default store;
