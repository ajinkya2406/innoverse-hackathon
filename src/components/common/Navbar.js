import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  Store as StoreIcon,
  AccountBalanceWallet as WalletIcon,
  ConfirmationNumber as TokenIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.ui);

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleNavigate('/profile')}>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/settings')}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      {user?.role === 'admin' && (
        <MenuItem onClick={() => handleNavigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderNotifications = (
    <Menu
      anchorEl={notificationEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(notificationEl)}
      onClose={handleNotificationClose}
    >
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <MenuItem
            key={notification._id}
            onClick={() => {
              handleNotificationClose();
              if (notification.link) {
                navigate(notification.link);
              }
            }}
          >
            {notification.message}
          </MenuItem>
        ))
      ) : (
        <MenuItem onClick={handleNotificationClose}>
          No new notifications
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          School Cash
        </Typography>

        {!isMobile && (
          <Box sx={{ ml: 4, display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<RestaurantIcon />}
              onClick={() => navigate('/meals')}
            >
              Meals
            </Button>
            <Button
              color="inherit"
              startIcon={<TokenIcon />}
              onClick={() => navigate('/tokens')}
            >
              My Tokens
            </Button>
            <Button
              color="inherit"
              startIcon={<StoreIcon />}
              onClick={() => navigate('/vendors')}
            >
              Vendors
            </Button>
            <Button
              color="inherit"
              startIcon={<WalletIcon />}
              onClick={() => navigate('/wallet')}
            >
              Wallet
            </Button>
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box
            onClick={handleProfileMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
          >
            <Avatar
              alt={user?.name}
              src={user?.avatar}
              sx={{ width: 32, height: 32 }}
            />
            {!isMobile && (
              <Typography sx={{ ml: 1 }}>
                {user?.name}
              </Typography>
            )}
          </Box>
        </Box>
      </Toolbar>
      {renderMenu}
      {renderNotifications}
    </AppBar>
  );
};

export default Navbar;
