import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  amount: yup
    .number()
    .required('Amount is required')
    .min(1, 'Amount must be at least 1')
    .max(50000, 'Amount cannot exceed 50,000'),
  paymentMethod: yup
    .string()
    .required('Payment method is required')
    .oneOf(['upi', 'card', 'netbanking'], 'Invalid payment method')
});

const AddMoneyDialog = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      amount: '',
      paymentMethod: 'upi'
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add Money to Wallet</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3, mt: 1 }}>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>
              }}
            />
          </Box>

          <FormControl error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}>
            <Typography color="text.secondary" gutterBottom>
              Payment Method
            </Typography>
            <RadioGroup
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label="UPI"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel
                value="netbanking"
                control={<Radio />}
                label="Net Banking"
              />
            </RadioGroup>
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <FormHelperText>{formik.errors.paymentMethod}</FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            Proceed to Pay
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddMoneyDialog;
