import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackbar } from '../../store/slices/uiSlice';

const AlertMessage = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(state => state.ui.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
