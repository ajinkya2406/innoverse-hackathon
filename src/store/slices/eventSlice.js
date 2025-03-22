import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllEvents = createAsyncThunk(
  'events/getAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('/api/events', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('/api/events', eventData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.put(`/api/events/${eventId}`, eventData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerForEvent = createAsyncThunk(
  'events/registerForEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(`/api/events/${eventId}/register`, {}, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelEventRegistration = createAsyncThunk(
  'events/cancelRegistration',
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(`/api/events/${eventId}/cancel`, {}, config);
      return { ...response.data, eventId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserEvents = createAsyncThunk(
  'events/getUserEvents',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('/api/users/events', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  events: [],
  userEvents: [],
  loading: false,
  error: null,
  successMessage: null
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all events cases
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch events';
      })
      // Create event cases
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = [...state.events, action.payload];
        state.successMessage = 'Event created successfully';
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create event';
      })
      // Update event cases
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.successMessage = 'Event updated successfully';
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update event';
      })
      // Register for event cases
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.userEvents = [...state.userEvents, action.payload.event];
        state.successMessage = 'Successfully registered for event';
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to register for event';
      })
      // Cancel registration cases
      .addCase(cancelEventRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelEventRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.userEvents = state.userEvents.filter(
          event => event._id !== action.payload.eventId
        );
        state.successMessage = 'Registration cancelled successfully';
      })
      .addCase(cancelEventRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to cancel registration';
      })
      // Get user events cases
      .addCase(getUserEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.userEvents = action.payload;
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user events';
      });
  }
});

export const { clearError, clearSuccess } = eventSlice.actions;
export default eventSlice.reducer;
