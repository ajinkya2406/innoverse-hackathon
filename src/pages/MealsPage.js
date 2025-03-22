import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../components/common/PageHeader';
import MealCard from '../components/meals/MealCard';
import OrderDialog from '../components/meals/OrderDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getAllMeals, createMealOrder } from '../store/slices/mealSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const MealsPage = () => {
  const dispatch = useDispatch();
  const { meals, loading, error } = useSelector((state) => state.meals);
  const { balance } = useSelector((state) => state.wallet);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    dispatch(getAllMeals());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleOrderClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleOrderConfirm = async (orderData) => {
    try {
      await dispatch(createMealOrder(orderData)).unwrap();
      setSelectedMeal(null);
      dispatch(showSnackbar({
        message: 'Order placed successfully',
        severity: 'success'
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || 'Failed to place order',
        severity: 'error'
      }));
    }
  };

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || meal.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(meals.map(meal => meal.category))];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="Meals"
          breadcrumbs={[{ text: 'Meals' }]}
        />

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search meals..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat}
                    value={cat}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : filteredMeals.length > 0 ? (
          <Grid container spacing={3}>
            {filteredMeals.map((meal) => (
              <Grid item key={meal._id} xs={12} sm={6} md={4}>
                <MealCard
                  meal={meal}
                  onOrder={handleOrderClick}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No meals found
            </Typography>
          </Box>
        )}

        <OrderDialog
          open={Boolean(selectedMeal)}
          onClose={() => setSelectedMeal(null)}
          meal={selectedMeal}
          walletBalance={balance}
          onConfirm={handleOrderConfirm}
        />
      </Box>
    </Container>
  );
};

export default MealsPage;
