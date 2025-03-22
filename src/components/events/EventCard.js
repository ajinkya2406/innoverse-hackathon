import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  formatCurrency,
  formatDate,
  formatEventType,
  formatEventStatus,
  getStatusColor
} from '../../utils/formatters';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';

const EventCard = ({
  event,
  onRegister,
  onViewDetails,
  isRegistered,
  disableRegistration
}) => {
  const {
    title,
    description,
    date,
    registrationDeadline,
    capacity,
    registeredCount,
    fee,
    type,
    status
  } = event;

  const registrationProgress = (registeredCount / capacity) * 100;
  const isFullyBooked = registeredCount >= capacity;
  const deadlinePassed = new Date(registrationDeadline) < new Date();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
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

        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarTodayIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              {formatDate(date)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PaymentIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              Fee: {formatCurrency(fee)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GroupIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              {registeredCount} / {capacity} registered
            </Typography>
          </Box>
        </Box>

        <Tooltip title={`${registrationProgress.toFixed(1)}% capacity filled`}>
          <LinearProgress
            variant="determinate"
            value={registrationProgress}
            sx={{ height: 6, borderRadius: 1 }}
          />
        </Tooltip>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          onClick={() => onViewDetails(event)}
        >
          View Details
        </Button>
        {!isRegistered && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onRegister(event)}
            disabled={disableRegistration || isFullyBooked || deadlinePassed}
            sx={{ ml: 'auto' }}
          >
            {isFullyBooked ? 'Fully Booked' : 'Register'}
          </Button>
        )}
        {isRegistered && (
          <Chip
            label="Registered"
            color="success"
            size="small"
            sx={{ ml: 'auto' }}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default EventCard;
