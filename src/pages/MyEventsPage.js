import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  Typography,
  Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import PageHeader from '../components/common/PageHeader';
import EventCard from '../components/events/EventCard';
import EventDetailsDialog from '../components/events/EventDetailsDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { getUserEvents, cancelEventRegistration } from '../store/slices/eventSlice';
import { showSnackbar } from '../store/slices/uiSlice';
import ConfirmDialog from '../components/common/ConfirmDialog';

const MyEventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const {
    userEvents,
    loading
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getUserEvents());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailsDialogOpen(true);
  };

  const handleCancelRegistration = async () => {
    try {
      await dispatch(cancelEventRegistration(selectedEvent._id)).unwrap();
      setIsCancelDialogOpen(false);
      dispatch(showSnackbar({
        message: 'Event registration cancelled successfully',
        severity: 'success'
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || 'Failed to cancel registration',
        severity: 'error'
      }));
    }
  };

  const currentDate = new Date();
  const upcomingEvents = userEvents.filter(
    event => new Date(event.date) > currentDate
  );
  const pastEvents = userEvents.filter(
    event => new Date(event.date) <= currentDate
  );

  const displayEvents = activeTab === 0 ? upcomingEvents : pastEvents;

  if (loading && !userEvents.length) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="My Events"
          breadcrumbs={[{ text: 'My Events', path: '/my-events' }]}
        />

        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`Upcoming (${upcomingEvents.length})`} />
            <Tab label={`Past (${pastEvents.length})`} />
          </Tabs>
        </Box>

        {displayEvents.length === 0 ? (
          <EmptyState
            title={`No ${activeTab === 0 ? 'Upcoming' : 'Past'} Events`}
            description={
              activeTab === 0
                ? "You haven't registered for any upcoming events."
                : "You haven't attended any events yet."
            }
            icon={EventIcon}
            actionText={activeTab === 0 ? 'Browse Events' : undefined}
            actionPath={activeTab === 0 ? '/events' : undefined}
          />
        ) : (
          <Grid container spacing={3}>
            {displayEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventCard
                  event={event}
                  onViewDetails={handleViewDetails}
                  isRegistered={true}
                  disableRegistration={true}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {selectedEvent && (
          <>
            <EventDetailsDialog
              open={isDetailsDialogOpen}
              onClose={() => setIsDetailsDialogOpen(false)}
              event={selectedEvent}
              isRegistered={true}
              disableRegistration={true}
              additionalActions={
                activeTab === 0 && (
                  <Button
                    color="error"
                    onClick={() => {
                      setIsDetailsDialogOpen(false);
                      setIsCancelDialogOpen(true);
                    }}
                  >
                    Cancel Registration
                  </Button>
                )
              }
            />

            <ConfirmDialog
              open={isCancelDialogOpen}
              title="Cancel Event Registration"
              message="Are you sure you want to cancel your registration for this event? This action cannot be undone."
              onConfirm={handleCancelRegistration}
              onCancel={() => setIsCancelDialogOpen(false)}
              confirmText="Cancel Registration"
              cancelText="Keep Registration"
              severity="error"
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default MyEventsPage;
