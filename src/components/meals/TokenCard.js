import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Alert
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { formatDate } from '../../utils/formatters';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TokenCard = ({
  token,
  onCancel,
  showQR = true
}) => {
  const {
    tokenNumber,
    meal,
    quantity,
    pickupTime,
    status,
    createdAt,
    expiresAt
  } = token;

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      used: 'default',
      expired: 'error',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const isActive = status === 'active';
  const currentTime = new Date();
  const expireTime = new Date(expiresAt);
  const isExpiringSoon = isActive && (expireTime - currentTime) <= 1800000; // 30 minutes

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" component="div">
              Token #{tokenNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(createdAt)}
            </Typography>
          </Box>
          <Chip
            label={status.toUpperCase()}
            color={getStatusColor(status)}
            size="small"
          />
        </Box>

        {showQR && isActive && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <QRCodeSVG
              value={tokenNumber}
              size={128}
              level="H"
              includeMargin
            />
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {meal.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {meal.vendorName}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RestaurantIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              Quantity: {quantity}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              Pickup: {pickupTime === 'lunch' ? 'Lunch (12:00 PM - 1:00 PM)' : 'Snacks (3:30 PM - 4:00 PM)'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              Counter: {meal.counterNumber}
            </Typography>
          </Box>
        </Box>

        {isExpiringSoon && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Token expires in {Math.ceil((expireTime - currentTime) / 60000)} minutes
          </Alert>
        )}

        {isActive && onCancel && (
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => onCancel(token)}
            >
              Cancel Token
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenCard;
