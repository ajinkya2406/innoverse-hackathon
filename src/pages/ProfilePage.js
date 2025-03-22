import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import PageHeader from '../components/common/PageHeader';
import { updateProfile } from '../store/slices/authSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const profileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number'),
  address: Yup.string(),
  currentPassword: Yup.string().min(6, 'Password must be at least 6 characters'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .when('currentPassword', {
      is: (val) => val && val.length > 0,
      then: Yup.string().required('New password is required')
    }),
  confirmPassword: Yup.string()
    .when('newPassword', {
      is: (val) => val && val.length > 0,
      then: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    })
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(updateProfile(values)).unwrap();
        setIsEditing(false);
        dispatch(showSnackbar({
          message: 'Profile updated successfully',
          severity: 'success'
        }));
      } catch (error) {
        dispatch(showSnackbar({
          message: error.message || 'Failed to update profile',
          severity: 'error'
        }));
      }
    }
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="Profile"
          breadcrumbs={[{ text: 'Profile' }]}
          action={
            !isEditing && (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )
          }
        />

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>
                <Avatar
                  alt={user?.name}
                  src={user?.avatar}
                  sx={{ width: 120, height: 120, mx: 'auto' }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      disabled={!isEditing}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      disabled={!isEditing}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                      disabled={!isEditing}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      multiline
                      rows={3}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                      disabled={!isEditing}
                    />
                  </Grid>

                  {isEditing && (
                    <>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Change Password
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="currentPassword"
                          name="currentPassword"
                          label="Current Password"
                          type="password"
                          value={formik.values.currentPassword}
                          onChange={formik.handleChange}
                          error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="newPassword"
                          name="newPassword"
                          label="New Password"
                          type="password"
                          value={formik.values.newPassword}
                          onChange={formik.handleChange}
                          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                          helperText={formik.touched.newPassword && formik.errors.newPassword}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="confirmPassword"
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                      </Grid>
                    </>
                  )}

                  {isEditing && (
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setIsEditing(false);
                            formik.resetForm();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;
