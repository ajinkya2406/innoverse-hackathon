import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Snackbar from './Snackbar';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!isAuthenticated) {
    return children;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar onDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 240px)` }
        }}
      >
        <Toolbar /> {/* Add space for fixed navbar */}
        {children}
      </Box>
      <Snackbar />
    </Box>
  );
};

export default Layout;
