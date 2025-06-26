import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { apiRequest } from '../../../utils/utils';
import { ADMIN_API } from '../../../utils/config';

const BASE_URL = `${ADMIN_API}`;

// Login Admin
export const adminLogin = createAsyncThunk('admin/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await apiRequest('POST', `${BASE_URL}/login`, { email, password }, false);
    Cookies.set('authToken', response.token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
  }
});

// Register Admin
export const registerAdmin = createAsyncThunk('admin/register', async (data, { rejectWithValue }) => {
  try {
    const response = await apiRequest('POST', `${BASE_URL}/register`, data, true);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Register failed');
  }
});

// Get All Admins
export const getAllAdmins = createAsyncThunk('admin/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await apiRequest('GET', BASE_URL, null, true);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch admins');
  }
});

// Update Admin
export const updateAdmin = createAsyncThunk('admin/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await apiRequest('PATCH', `${BASE_URL}/${id}`, data, true);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Update failed');
  }
});

// Delete Admin
export const deleteAdmin = createAsyncThunk('admin/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await apiRequest('DELETE', `${BASE_URL}/${id}`, null, true);
    return { id, ...response };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Delete failed');
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [],
    admin: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearAdminState: (state) => {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Login successful';
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Admin registered successfully';
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Admin updated successfully';
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Admin deleted successfully';
        state.admins = state.admins.filter(admin => admin._id !== action.payload.id);
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
