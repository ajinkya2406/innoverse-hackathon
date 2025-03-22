import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  notifications: [],
  theme: localStorage.getItem('theme') || 'light',
  loading: {
    global: false,
    submitForm: false,
    fetchData: false
  },
  dialog: {
    open: false,
    type: null,
    props: {}
  },
  snackbar: {
    open: false,
    message: '',
    severity: 'info' // 'error', 'warning', 'info', 'success'
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setLoading: (state, action) => {
      const { type, status } = action.payload;
      state.loading[type] = status;
    },
    openDialog: (state, action) => {
      state.dialog = {
        open: true,
        type: action.payload.type,
        props: action.payload.props || {}
      };
    },
    closeDialog: (state) => {
      state.dialog = {
        open: false,
        type: null,
        props: {}
      };
    },
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info'
      };
    },
    hideSnackbar: (state) => {
      state.snackbar = {
        ...state.snackbar,
        open: false
      };
    }
  }
});

export const {
  toggleSidebar,
  addNotification,
  removeNotification,
  setTheme,
  setLoading,
  openDialog,
  closeDialog,
  showSnackbar,
  hideSnackbar
} = uiSlice.actions;

export default uiSlice.reducer;
