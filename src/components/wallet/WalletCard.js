import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { formatCurrency } from '../../utils/formatters';

const WalletCard = ({ balance, onAddMoney }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}
        >
          <AccountBalanceWalletIcon
            sx={{ fontSize: 40, color: 'primary.main', mr: 2 }}
          />
          <Typography variant="h6" component="div">
            My Wallet
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 3 }}>
          <Typography color="text.secondary" gutterBottom>
            Available Balance
          </Typography>
          <Typography variant="h4" component="div" color="primary.main">
            {formatCurrency(balance)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onAddMoney}
        >
          Add Money
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
