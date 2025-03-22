import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import VendorCard from '../components/vendors/VendorCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getAllVendors } from '../store/slices/vendorSlice';
import PageHeader from '../components/common/PageHeader';

const VendorsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendors, loading, error } = useSelector((state) => state.vendors);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllVendors());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddVendor = () => {
    navigate('/vendors/create');
  };

  const filteredVendors = vendors?.filter(vendor => {
    if (!vendor) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      vendor.businessName?.toLowerCase().includes(searchLower) ||
      vendor.description?.toLowerCase().includes(searchLower) ||
      vendor.counterNumber?.toString().includes(searchLower)
    );
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title="Vendors">
        {user?.role === 'admin' && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddVendor}
          >
            Add Vendor
          </Button>
        )}
      </PageHeader>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredVendors?.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary">
              No vendors found
            </Typography>
          </Grid>
        ) : (
          filteredVendors?.map((vendor) => (
            <Grid item xs={12} sm={6} md={4} key={vendor._id}>
              <VendorCard
                vendor={vendor}
                isAdmin={user?.role === 'admin'}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default VendorsPage;
