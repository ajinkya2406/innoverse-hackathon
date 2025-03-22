import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import EventCard from '../components/events/EventCard';
import EventRegistrationDialog from '../components/events/EventRegistrationDialog';
import EventDetailsDialog from '../components/events/EventDetailsDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { getAllEvents, registerForEvent } from '../store/slices/eventSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const eventTypes = [
  { value: '', label: 'All Types' },
  { value: 'academic', label: 'Academic' },
  { value: 'sports', label: 'Sports' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'other', label: 'Other' }
];

const EventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const {
    events,
    loading,
    userEvents
  } = useSelector((state) => state.events);

  const { balance } = useSelector((state) => state.wallet);
  const { role, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const filteredEvents = events?.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setIsRegistrationDialogOpen(true);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailsDialogOpen(true);
  };

  const handleRegistration = async () => {
    try {
      await dispatch(registerForEvent(selectedEvent?._id)).unwrap();
      setIsRegistrationDialogOpen(false);
      dispatch(showSnackbar({
        message: 'Successfully registered for the event',
        severity: 'success'
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || 'Failed to register for the event',
        severity: 'error'
      }));
    }
  };

  if (loading && !events?.length) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="Events"
          breadcrumbs={[{ text: 'Events', path: '/events' }]}
        />

        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ flexGrow: 1 }}
          />

          <TextField
            select
            size="small"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 150 }}
          >
            {eventTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>

          {user?.role === 'admin' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/events/create')}
            >
              Create Event
            </Button>
          )}
        </Box>

        {filteredEvents?.length === 0 ? (
          <EmptyState
            title="No Events Found"
            description="There are no events matching your search criteria."
            icon={FilterListIcon}
          />
        ) : (
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventCard
                  event={event}
                  onRegister={handleRegisterClick}
                  onViewDetails={handleViewDetails}
                  isRegistered={userEvents?.some(e => e._id === event._id)}
                  disableRegistration={user?.role === 'admin'}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {selectedEvent && (
          <>
            <EventRegistrationDialog
              open={isRegistrationDialogOpen}
              onClose={() => setIsRegistrationDialogOpen(false)}
              event={selectedEvent}
              walletBalance={balance}
              onConfirm={handleRegistration}
            />

            <EventDetailsDialog
              open={isDetailsDialogOpen}
              onClose={() => setIsDetailsDialogOpen(false)}
              event={selectedEvent}
              isRegistered={userEvents?.some(e => e._id === selectedEvent._id)}
              onRegister={handleRegisterClick}
              disableRegistration={user?.role === 'admin'}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default EventsPage;
