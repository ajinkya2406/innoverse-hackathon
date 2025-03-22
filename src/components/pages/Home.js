import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EventIcon from '@mui/icons-material/Event';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to School Management System
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          A comprehensive digital solution for school payments and management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/register"
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <AccountBalanceWalletIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Digital Wallet
            </Typography>
            <Typography align="center" color="textSecondary">
              Manage your child's school expenses with our secure digital wallet system
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <RestaurantIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Meal Management
            </Typography>
            <Typography align="center" color="textSecondary">
              Book meals and manage cafeteria expenses with our token system
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <EventIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Event Registration
            </Typography>
            <Typography align="center" color="textSecondary">
              Register and pay for school events and activities seamlessly
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
