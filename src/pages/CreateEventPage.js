import React from 'react';
import {
  Container,
  Box,
  Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/common/PageHeader';
import CreateEventForm from '../components/events/CreateEventForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { createEvent, updateEvent } from '../store/slices/eventSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();

  const { events, loading } = useSelector((state) => state.events);
  const event = eventId ? events.find(e => e._id === eventId) : null;

  const handleSubmit = async (values) => {
    try {
      if (eventId) {
        await dispatch(updateEvent({ id: eventId, data: values })).unwrap();
        dispatch(showSnackbar({
          message: 'Event updated successfully',
          severity: 'success'
        }));
      } else {
        await dispatch(createEvent(values)).unwrap();
        dispatch(showSnackbar({
          message: 'Event created successfully',
          severity: 'success'
        }));
      }
      navigate('/events');
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || `Failed to ${eventId ? 'update' : 'create'} event`,
        severity: 'error'
      }));
    }
  };

  if (eventId && loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title={eventId ? 'Edit Event' : 'Create Event'}
          breadcrumbs={[
            { text: 'Events', path: '/events' },
            { text: eventId ? 'Edit Event' : 'Create Event' }
          ]}
        />

        <Paper sx={{ p: 4 }}>
          <CreateEventForm
            onSubmit={handleSubmit}
            initialValues={event}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateEventPage;
