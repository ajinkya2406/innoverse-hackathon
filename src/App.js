import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import store from './store/store';
import { getCurrentUser } from './store/slices/authSlice';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import VendorProfilePage from './pages/VendorProfilePage';
import WalletPage from './pages/WalletPage';
import MealsPage from './pages/MealsPage';
import EventsPage from './pages/EventsPage';

// Private route component
const PrivateRoute = () => {
  const { token } = useSelector(state => state.auth);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

// Public route component (accessible only when not logged in)
const PublicRoute = () => {
  const { token } = useSelector(state => state.auth);
  return !token ? <Outlet /> : <Navigate to="/dashboard" />;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          }
        ]
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />
          },
          {
            path: 'profile',
            element: <ProfilePage />
          },
          {
            path: 'settings',
            element: <SettingsPage />
          },
          {
            path: 'vendor-profile',
            element: <VendorProfilePage />
          },
          {
            path: 'wallet',
            element: <WalletPage />
          },
          {
            path: 'meals',
            element: <MealsPage />
          },
          {
            path: 'events',
            element: <EventsPage />
          }
        ]
      }
    ]
  }
]);

const App = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider router={router} />
  );
};

function AppWrapper() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  );
}

export default AppWrapper;
