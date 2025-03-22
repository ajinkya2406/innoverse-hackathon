import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageHeader from '../components/common/PageHeader';
import VendorForm from '../components/vendors/VendorForm';
import MealCard from '../components/meals/MealCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  getVendorProfile,
  updateVendorStatus,
  updateVendorProfile
} from '../store/slices/vendorSlice';
import { getMealsByVendor } from '../store/slices/mealSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const VendorProfilePage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentVendor, loading, error } = useSelector((state) => state.vendors);
  const { meals, loading: mealsLoading } = useSelector((state) => state.meals);
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [statusDialog, setStatusDialog] = useState(null);

  useEffect(() => {
    if (vendorId) {
      dispatch(getVendorProfile(vendorId));
      dispatch(getMealsByVendor(vendorId));
    }
  }, [dispatch, vendorId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleStatusUpdate = async () => {
    try {
      await dispatch(updateVendorStatus({
        vendorId,
        status: statusDialog.newStatus
      })).unwrap();
      setStatusDialog(null);
      dispatch(showSnackbar({
        message: 'Vendor status updated successfully',
        severity: 'success'
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || 'Failed to update vendor status',
        severity: 'error'
      }));
    }
  };

  const handleProfileUpdate = async (values) => {
    try {
      await dispatch(updateVendorProfile({
        vendorId,
        data: values
      })).unwrap();
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
  };

  if (loading && !currentVendor) {
    return <LoadingSpinner />;
  }

  if (!currentVendor) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          Vendor not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title={currentVendor.businessName}
          breadcrumbs={[
            { text: 'Vendors', path: '/vendors' },
            { text: currentVendor.businessName }
          ]}
          action={
            user?.role === 'admin' && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  color={currentVendor.status === 'active' ? 'error' : 'success'}
                  startIcon={currentVendor.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                  onClick={() => setStatusDialog({
                    newStatus: currentVendor.status === 'active' ? 'inactive' : 'active'
                  })}
                >
                  {currentVendor.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
              </Box>
            )
          }
        />

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="vendor tabs"
          >
            <Tab label="Profile" id="vendor-tab-0" />
            <Tab label="Meals" id="vendor-tab-1" />
          </Tabs>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Box role="tabpanel" hidden={activeTab !== 0}>
          {activeTab === 0 && (
            isEditing ? (
              <Paper sx={{ p: 3 }}>
                <VendorForm
                  initialValues={currentVendor}
                  onSubmit={handleProfileUpdate}
                />
              </Paper>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Business Information
                    </Typography>
                    {/* Add business details display */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Contact Information
                    </Typography>
                    {/* Add contact details display */}
                  </Paper>
                </Grid>
              </Grid>
            )
          )}
        </Box>

        <Box role="tabpanel" hidden={activeTab !== 1}>
          {activeTab === 1 && (
            mealsLoading ? (
              <LoadingSpinner />
            ) : meals.length > 0 ? (
              <Grid container spacing={3}>
                {meals.map((meal) => (
                  <Grid item key={meal._id} xs={12} sm={6} md={4}>
                    <MealCard meal={meal} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No meals found
                </Typography>
              </Box>
            )
          )}
        </Box>

        {/* Status Update Dialog */}
        <Dialog
          open={Boolean(statusDialog)}
          onClose={() => setStatusDialog(null)}
        >
          <DialogTitle>
            {statusDialog?.newStatus === 'active' ? 'Activate' : 'Deactivate'} Vendor
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to {statusDialog?.newStatus === 'active' ? 'activate' : 'deactivate'} this vendor?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStatusDialog(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              color={statusDialog?.newStatus === 'active' ? 'success' : 'error'}
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default VendorProfilePage;
