import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
  const navigate = useNavigate();
  const {
    _id,
    businessName,
    description,
    image,
    rating,
    totalRatings,
    status,
    categories,
    phoneNumber,
    email,
    location
  } = vendor;

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      inactive: 'error',
      pending: 'warning'
    };
    return colors[status] || 'default';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="160"
        image={image || '/images/vendor-placeholder.jpg'}
        alt={businessName}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {businessName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={rating} precision={0.5} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({totalRatings})
              </Typography>
            </Box>
          </Box>
          <Chip
            label={status.toUpperCase()}
            color={getStatusColor(status)}
            size="small"
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">{phoneNumber}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">{email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton
            color="primary"
            onClick={() => navigate(`/vendors/${_id}`)}
            aria-label="view vendor details"
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
