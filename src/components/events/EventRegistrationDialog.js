import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert
} from '@mui/material';
import {
  formatCurrency,
  formatDate
} from '../../utils/formatters';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const EventRegistrationDialog = ({
  open,
  onClose,
  event,
  walletBalance,
  onConfirm
}) => {
  const {
    title,
    date,
    registrationDeadline,
    fee,
    capacity,
    registeredCount
  } = event;

  const hasInsufficientBalance = walletBalance < fee;
  const isFullyBooked = registeredCount >= capacity;
  const deadlinePassed = new Date(registrationDeadline) < new Date();

  const getRegistrationStatus = () => {
    if (isFullyBooked) {
      return {
        message: 'This event is fully booked.',
        severity: 'error'
      };
    }
    if (deadlinePassed) {
      return {
        message: 'Registration deadline has passed.',
        severity: 'error'
      };
    }
    if (hasInsufficientBalance) {
      return {
        message: 'Insufficient wallet balance. Please add money to your wallet.',
        severity: 'warning'
      };
    }
    return {
      message: 'You can register for this event.',
      severity: 'info'
    };
  };

  const status = getRegistrationStatus();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Register for Event</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <List sx={{ mb: 2 }}>
          <ListItem>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText
              primary="Event Date"
              secondary={formatDate(date)}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Registration Deadline"
              secondary={formatDate(registrationDeadline)}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText
              primary="Registration Fee"
              secondary={formatCurrency(fee)}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary="Available Slots"
              secondary={`${capacity - registeredCount} out of ${capacity}`}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Wallet Balance
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountBalanceWalletIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              color={hasInsufficientBalance ? 'error.main' : 'primary.main'}
            >
              {formatCurrency(walletBalance)}
            </Typography>
          </Box>
        </Box>

        <Alert severity={status.severity}>
          {status.message}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          disabled={hasInsufficientBalance || isFullyBooked || deadlinePassed}
        >
          Confirm Registration
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventRegistrationDialog;
