import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem
} from '@mui/material';
import { register, clearError } from '../store/slices/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'parent',
    phone: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    // If user is already logged in, redirect to dashboard
    if (token) {
      navigate('/dashboard');
    }
  }, [dispatch, token, navigate]);

  const validateForm = () => {
    const errors = {};
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = 'Please enter a valid email address';
    }
    if (formData.phone && !formData.phone.match(/^\+?[\d\s-]+$/)) {
      errors.phone = 'Please enter a valid phone number';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...registerData } = formData;
      const result = await dispatch(register(registerData));
      if (!result.error) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!validationErrors.confirmPassword}
              helperText={validationErrors.confirmPassword}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="role"
              label="Role"
              id="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="vendor">Vendor</MenuItem>
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Login here
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
