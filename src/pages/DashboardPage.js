import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  PeopleOutline as PeopleIcon,
  AccountBalanceWallet as WalletIcon,
  Event as EventIcon,
  Store as StoreIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency, formatDate } from '../utils/formatters';

// Import necessary actions
import { getDashboardStats } from '../store/slices/dashboardSlice';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ fontSize: 40, color: `${color}.main`, mr: 2 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" color={`${color}.main`}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    stats = {},
    recentTransactions = [],
    upcomingEvents = [],
    loading = false,
    error
  } = useSelector((state) => state.dashboard || {});

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  if (loading && !stats) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="Dashboard"
          breadcrumbs={[{ text: 'Dashboard', path: '/dashboard' }]}
        />

        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={PeopleIcon}
              title="Total Users"
              value={stats?.totalUsers || 0}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={WalletIcon}
              title="Total Revenue"
              value={formatCurrency(stats?.totalRevenue || 0)}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={EventIcon}
              title="Active Events"
              value={stats?.activeEvents || 0}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={StoreIcon}
              title="Active Vendors"
              value={stats?.activeVendors || 0}
              color="warning"
            />
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Transactions</Typography>
                <IconButton onClick={() => navigate('/transactions')}>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
              <List>
                {recentTransactions.slice(0, 5).map((transaction, index) => (
                  <React.Fragment key={transaction._id}>
                    <ListItem>
                      <ListItemText
                        primary={transaction.description}
                        secondary={formatDate(transaction.date)}
                      />
                      <ListItemSecondaryAction>
                        <Typography
                          color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < recentTransactions.slice(0, 5).length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Upcoming Events */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Upcoming Events</Typography>
                <IconButton onClick={() => navigate('/events')}>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
              <List>
                {upcomingEvents.slice(0, 5).map((event, index) => (
                  <React.Fragment key={event._id}>
                    <ListItem>
                      <ListItemText
                        primary={event.title}
                        secondary={`${formatDate(event.date)} • ${event.registeredCount}/${event.capacity} registered`}
                      />
                      <ListItemSecondaryAction>
                        <Typography color="primary">
                          {formatCurrency(event.fee)}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < upcomingEvents.slice(0, 5).length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Monthly Revenue Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Monthly Revenue
              </Typography>
              {/* Add a chart component here */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage;
