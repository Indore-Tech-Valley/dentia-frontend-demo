import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../utils/utils';
import { DOCTOR_API, ADMIN_DOCTOR_API } from '../../../utils/config';

// POST - Create Doctor
export const createDoctor = createAsyncThunk(
  'doctor/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', ADMIN_DOCTOR_API, data, true);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET - Fetch All Doctors
export const fetchDoctors = createAsyncThunk(
  'doctor/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', DOCTOR_API, null, false);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PATCH - Update Doctor
export const updateDoctor = createAsyncThunk(
  'doctor/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiRequest('PUT', `${ADMIN_DOCTOR_API}/${id}`, data, true);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE - Remove Doctor
export const deleteDoctor = createAsyncThunk(
  'doctor/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest('DELETE', `${ADMIN_DOCTOR_API}/${id}`, null, true);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const doctorsSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearDoctorState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.doctors.findIndex((doc) => doc._id === action.payload._id);
        if (index !== -1) state.doctors[index] = action.payload;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter((doc) => doc._id !== action.payload);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorState } = doctorsSlice.actions;
export default doctorsSlice.reducer;
