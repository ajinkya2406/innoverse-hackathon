import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import { vendorProfileSchema } from '../../utils/validation';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const categories = [
  'Breakfast',
  'Lunch',
  'Snacks',
  'Beverages',
  'South Indian',
  'North Indian',
  'Chinese',
  'Fast Food',
  'Healthy Food',
  'Desserts'
];

const VendorForm = ({ onSubmit, initialValues = null }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      businessName: '',
      description: '',
      phoneNumber: '',
      email: '',
      location: '',
      categories: [],
      services: [],
      openingTime: '',
      closingTime: '',
      counterNumber: '',
      gstNumber: '',
      fssaiLicense: '',
      bankName: '',
      accountNumber: '',
      ifscCode: ''
    },
    validationSchema: vendorProfileSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="businessName"
            name="businessName"
            label="Business Name"
            value={formik.values.businessName}
            onChange={formik.handleChange}
            error={formik.touched.businessName && Boolean(formik.errors.businessName)}
            helperText={formik.touched.businessName && formik.errors.businessName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Business Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth error={formik.touched.categories && Boolean(formik.errors.categories)}>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              labelId="categories-label"
              id="categories"
              multiple
              value={formik.values.categories}
              onChange={formik.handleChange}
              input={<OutlinedInput id="categories" label="Categories" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.categories && formik.errors.categories && (
              <FormHelperText>{formik.errors.categories}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="openingTime"
            name="openingTime"
            label="Opening Time"
            type="time"
            value={formik.values.openingTime}
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="closingTime"
            name="closingTime"
            label="Closing Time"
            type="time"
            value={formik.values.closingTime}
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="counterNumber"
            name="counterNumber"
            label="Counter Number"
            value={formik.values.counterNumber}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="gstNumber"
            name="gstNumber"
            label="GST Number"
            value={formik.values.gstNumber}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="fssaiLicense"
            name="fssaiLicense"
            label="FSSAI License Number"
            value={formik.values.fssaiLicense}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="bankName"
              name="bankName"
              label="Bank Name"
              value={formik.values.bankName}
              onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="accountNumber"
              name="accountNumber"
              label="Account Number"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
            />
          </Box>
          <TextField
            fullWidth
            id="ifscCode"
            name="ifscCode"
            label="IFSC Code"
            value={formik.values.ifscCode}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {initialValues ? 'Update Profile' : 'Submit Application'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default VendorForm;
