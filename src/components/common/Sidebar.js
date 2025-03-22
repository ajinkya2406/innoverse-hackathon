import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  Store as StoreIcon,
  AccountBalanceWallet as WalletIcon,
  ConfirmationNumber as TokenIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    ...(user?.role === 'admin' ? [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }
    ] : []),
    { text: 'Meals', icon: <RestaurantIcon />, path: '/meals' },
    { text: 'My Tokens', icon: <TokenIcon />, path: '/tokens' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'My Events', icon: <EventIcon />, path: '/my-events' },
    { text: 'Vendors', icon: <StoreIcon />, path: '/vendors' },
    { text: 'Wallet', icon: <WalletIcon />, path: '/wallet' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  const drawer = (
    <Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  onDrawerToggle();
                }
              }}
            >
              <ListItemIcon sx={{
                color: location.pathname === item.path ? 'primary.main' : 'inherit'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'inherit'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              bgcolor: 'background.paper'
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
