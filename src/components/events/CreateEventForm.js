import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormik } from 'formik';
import { eventSchema } from '../../utils/validation';

const eventTypes = [
  { value: 'academic', label: 'Academic' },
  { value: 'sports', label: 'Sports' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'other', label: 'Other' }
];

const CreateEventForm = ({ onSubmit, initialValues = null }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      description: '',
      date: null,
      registrationDeadline: null,
      capacity: '',
      fee: '',
      type: '',
      location: '',
      organizer: '',
      additionalDetails: ''
    },
    validationSchema: eventSchema,
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
            id="title"
            name="title"
            label="Event Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Event Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DateTimePicker
            label="Event Date"
            value={formik.values.date}
            onChange={(value) => formik.setFieldValue('date', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DateTimePicker
            label="Registration Deadline"
            value={formik.values.registrationDeadline}
            onChange={(value) => formik.setFieldValue('registrationDeadline', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={formik.touched.registrationDeadline && Boolean(formik.errors.registrationDeadline)}
                helperText={formik.touched.registrationDeadline && formik.errors.registrationDeadline}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="capacity"
            name="capacity"
            label="Capacity"
            type="number"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
            helperText={formik.touched.capacity && formik.errors.capacity}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="fee"
            name="fee"
            label="Registration Fee"
            type="number"
            value={formik.values.fee}
            onChange={formik.handleChange}
            error={formik.touched.fee && Boolean(formik.errors.fee)}
            helperText={formik.touched.fee && formik.errors.fee}
            InputProps={{
              startAdornment: '₹'
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            error={formik.touched.type && Boolean(formik.errors.type)}
          >
            <InputLabel id="type-label">Event Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              label="Event Type"
            >
              {eventTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.type && formik.errors.type && (
              <FormHelperText>{formik.errors.type}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
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
          <TextField
            fullWidth
            id="organizer"
            name="organizer"
            label="Organizer"
            value={formik.values.organizer}
            onChange={formik.handleChange}
            error={formik.touched.organizer && Boolean(formik.errors.organizer)}
            helperText={formik.touched.organizer && formik.errors.organizer}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="additionalDetails"
            name="additionalDetails"
            label="Additional Details"
            multiline
            rows={3}
            value={formik.values.additionalDetails}
            onChange={formik.handleChange}
            error={formik.touched.additionalDetails && Boolean(formik.errors.additionalDetails)}
            helperText={formik.touched.additionalDetails && formik.errors.additionalDetails}
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
              {initialValues ? 'Update Event' : 'Create Event'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateEventForm;
