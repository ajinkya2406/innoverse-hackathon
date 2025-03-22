import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert
} from '@mui/material';
import { formatCurrency } from '../../utils/formatters';

const OrderDialog = ({
  open,
  onClose,
  meal,
  walletBalance,
  onConfirm
}) => {
  const [quantity, setQuantity] = useState(1);
  const [pickupTime, setPickupTime] = useState('lunch');

  const totalAmount = meal?.price * quantity;
  const hasInsufficientBalance = walletBalance < totalAmount;

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= 5) {
      setQuantity(value);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      mealId: meal._id,
      quantity,
      pickupTime,
      totalAmount
    });
  };

  if (!meal) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Order Meal</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">{meal.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            by {meal.vendorName}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1, max: 5 }}
            helperText="Maximum 5 meals per order"
          />
        </Box>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Pickup Time</FormLabel>
          <RadioGroup
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          >
            <FormControlLabel
              value="lunch"
              control={<Radio />}
              label="Lunch (12:00 PM - 1:00 PM)"
            />
            <FormControlLabel
              value="snacks"
              control={<Radio />}
              label="Snacks (3:30 PM - 4:00 PM)"
            />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Order Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Price per meal</Typography>
            <Typography>{formatCurrency(meal.price)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Quantity</Typography>
            <Typography>{quantity}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Total Amount
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              {formatCurrency(totalAmount)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Wallet Balance
          </Typography>
          <Typography
            variant="h6"
            color={hasInsufficientBalance ? 'error.main' : 'success.main'}
          >
            {formatCurrency(walletBalance)}
          </Typography>
        </Box>

        {hasInsufficientBalance && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Insufficient wallet balance. Please add money to your wallet.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={hasInsufficientBalance}
        >
          Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
