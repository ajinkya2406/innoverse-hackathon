import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventNoteIcon from '@mui/icons-material/EventNote';

const Dashboard = () => {
  // TODO: Replace with actual data from Redux store
  const walletBalance = 500;
  const recentTransactions = [
    { id: 1, description: 'Cafeteria Payment', amount: -50, date: '2023-07-20' },
    { id: 2, description: 'Wallet Top-up', amount: 200, date: '2023-07-19' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Wallet Balance */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <AccountBalanceWalletIcon
                sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
              />
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Wallet Balance
              </Typography>
              <Typography component="p" variant="h4">
                ${walletBalance}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Add Money
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Transactions
            </Typography>
            {recentTransactions.map((transaction) => (
              <Box
                key={transaction.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ReceiptIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="body1">
                      {transaction.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                >
                  ${Math.abs(transaction.amount)}
                </Typography>
              </Box>
            ))}
            <Button
              color="primary"
              sx={{ alignSelf: 'flex-end', mt: 'auto' }}
            >
              View All Transactions
            </Button>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<AccountBalanceWalletIcon />}
                >
                  Add Money to Wallet
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ReceiptIcon />}
                >
                  Make Payment
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EventNoteIcon />}
                >
                  Register for Event
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
