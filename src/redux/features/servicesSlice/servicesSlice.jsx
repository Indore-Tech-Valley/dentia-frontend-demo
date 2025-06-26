// redux/features/serviceSlice/serviceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, apiRequestMultipart } from '../../../utils/utils';
import { SERVICE_API, ADMIN_SERVICE_API } from '../../../utils/config';

// POST - Create Service
export const createService = createAsyncThunk(
  'service/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequestMultipart('POST', ADMIN_SERVICE_API, data, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET - Fetch All Services
export const fetchServices = createAsyncThunk(
  'service/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', SERVICE_API, null, false);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// PATCH - Update Service
export const updateService = createAsyncThunk(
  'service/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiRequestMultipart('PATCH', `${ADMIN_SERVICE_API}/${id}`, data, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// DELETE - Delete Service
export const deleteService = createAsyncThunk(
  'service/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest('DELETE', `${ADMIN_SERVICE_API}/${id}`, null, true);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    services: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearServiceState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.services.findIndex(s => s._id === action.payload._id);
        if (index !== -1) state.services[index] = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(s => s._id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;