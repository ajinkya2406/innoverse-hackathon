import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
  // TODO: Replace with actual auth check from Redux store
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          School Management
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/dashboard"
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
