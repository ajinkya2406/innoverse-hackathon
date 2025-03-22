import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getSettings, updateSettings } from '../store/slices/settingsSlice';
import PageHeader from '../components/common/PageHeader';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { settings, loading, error, success } = useSelector((state) => state.settings);
  const [formData, setFormData] = useState({
    schoolName: '',
    contactEmail: '',
    contactPhone: '',
    allowParentRegistration: false,
    allowVendorRegistration: false,
    maxDailySpendLimit: 0,
    notificationEnabled: false
  });

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setFormData({
        schoolName: settings.schoolName || '',
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
        allowParentRegistration: settings.allowParentRegistration || false,
        allowVendorRegistration: settings.allowVendorRegistration || false,
        maxDailySpendLimit: settings.maxDailySpendLimit || 0,
        notificationEnabled: settings.notificationEnabled || false
      });
    }
  }, [settings]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateSettings(formData));
  };

  if (loading && !settings) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <PageHeader title="Settings" />
      
      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="School Name"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Daily Spend Limit"
                name="maxDailySpendLimit"
                type="number"
                value={formData.maxDailySpendLimit}
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.allowParentRegistration}
                    onChange={handleChange}
                    name="allowParentRegistration"
                  />
                }
                label="Allow Parent Registration"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.allowVendorRegistration}
                    onChange={handleChange}
                    name="allowVendorRegistration"
                  />
                }
                label="Allow Vendor Registration"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notificationEnabled}
                    onChange={handleChange}
                    name="notificationEnabled"
                  />
                }
                label="Enable Notifications"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
