import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Alert,
  ButtonGroup,
} from '@mui/material';
import axios from 'axios';

const defaultUsers = {
  parent: { email: 'parent@school.com', password: 'parent123' },
  student: { email: 'student@school.com', password: 'student123' },
  vendor: { email: 'vendor@school.com', password: 'vendor123' }
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const setDefaultUser = (userType) => {
    setFormData(defaultUsers[userType]);
  };

  return (
    <Container maxWidth="xs">
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
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
            />

            <Typography variant="body2" align="center" sx={{ mt: 2, mb: 1 }}>
              Quick Login As:
            </Typography>
            <ButtonGroup fullWidth variant="outlined" sx={{ mb: 2 }}>
              <Button onClick={() => setDefaultUser('parent')}>Parent</Button>
              <Button onClick={() => setDefaultUser('student')}>Student</Button>
              <Button onClick={() => setDefaultUser('vendor')}>Vendor</Button>
            </ButtonGroup>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </Button>
            <Box textAlign="center">
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
