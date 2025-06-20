import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../utils/utils';
import {APPOINTMENT_API_URL,ADMIN_APPOINTMENT_API_URL} from '../../../utils/config';


// CREATE Appointment
export const createAppointment = createAsyncThunk(
  'appointment/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', APPOINTMENT_API_URL, appointmentData, false);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET All Appointments
export const fetchAppointments = createAsyncThunk(
  'appointment/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', ADMIN_APPOINTMENT_API_URL, null, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



// DELETE Appointment
export const deleteAppointment = createAsyncThunk(
  'appointment/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiRequest('DELETE', `${ADMIN_APPOINTMENT_API_URL}/${id}`, null, true);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearAppointmentState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // Create
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointments = state.appointments.filter((a) => a._id !== action.payload.id);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
