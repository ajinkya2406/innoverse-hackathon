import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Rating
} from '@mui/material';
import { formatCurrency } from '../../utils/formatters';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VegetarianIcon from '@mui/icons-material/Spa';

const MealCard = ({
  meal,
  onOrder,
  disabled = false
}) => {
  const {
    name,
    description,
    price,
    image,
    category,
    isVegetarian,
    rating,
    available,
    vendorName
  } = meal;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="160"
        image={image || '/images/meal-placeholder.jpg'}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              by {vendorName}
            </Typography>
          </Box>
          {isVegetarian && (
            <VegetarianIcon color="success" titleAccess="Vegetarian" />
          )}
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

        <Box sx={{ mb: 2 }}>
          <Chip
            icon={<RestaurantIcon />}
            label={category}
            size="small"
            sx={{ mr: 1 }}
          />
          {available ? (
            <Chip
              label="Available"
              color="success"
              size="small"
            />
          ) : (
            <Chip
              label="Sold Out"
              color="error"
              size="small"
            />
          )}
        </Box>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({rating})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary.main">
            {formatCurrency(price)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onOrder(meal)}
            disabled={disabled || !available}
          >
            Order Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealCard;
