import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  formatCurrency,
  formatDate,
  formatEventType,
  formatEventStatus,
  getStatusColor
} from '../../utils/formatters';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';

const EventDetailsDialog = ({
  open,
  onClose,
  event,
  isRegistered,
  onRegister,
  disableRegistration
}) => {
  const {
    title,
    description,
    date,
    registrationDeadline,
    fee,
    capacity,
    registeredCount,
    location,
    type,
    status,
    organizer,
    additionalDetails
  } = event;

  const isFullyBooked = registeredCount >= capacity;
  const deadlinePassed = new Date(registrationDeadline) < new Date();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{title}</Typography>
          <Box>
            <Chip
              label={formatEventType(type)}
              color="primary"
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip
              label={formatEventStatus(status)}
              color={getStatusColor(status)}
              size="small"
            />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>
              About the Event
            </Typography>
            <Typography variant="body1" paragraph>
              {description}
            </Typography>

            {additionalDetails && (
              <>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Additional Details
                </Typography>
                <Typography variant="body1" paragraph>
                  {additionalDetails}
                </Typography>
              </>
            )}

            {organizer && (
              <>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Organizer
                </Typography>
                <Typography variant="body1" paragraph>
                  {organizer}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Event Date"
                  secondary={formatDate(date)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Registration Deadline"
                  secondary={formatDate(registrationDeadline)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={location}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Event Type"
                  secondary={formatEventType(type)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Registration Fee"
                  secondary={formatCurrency(fee)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Capacity"
                  secondary={`${registeredCount} / ${capacity} registered`}
                />
              </ListItem>
            </List>

            {isRegistered && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="success">
                  You are registered for this event
                </Alert>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {!isRegistered && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onRegister(event)}
            disabled={disableRegistration || isFullyBooked || deadlinePassed}
          >
            {isFullyBooked ? 'Fully Booked' : 'Register'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsDialog;
