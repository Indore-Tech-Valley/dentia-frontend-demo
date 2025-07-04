// redux/features/patientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN_PATIENT_API,PATIENT_API } from '../../../utils/config';
import { apiRequest } from '../../../utils/utils';

const API_URL = ADMIN_PATIENT_API;


// Async Thunks
export const fetchPatients = createAsyncThunk('patients/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await apiRequest('GET', API_URL,null,true);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchPatientByCode = createAsyncThunk(
  'patients/fetchByCode',
  async (code, thunkAPI) => {
    try {
      const res = await apiRequest('GET', `${PATIENT_API}/${code}`, null, false);
      return res; // assuming response is { success: true, data: {...} }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createPatient = createAsyncThunk('patients/create', async (data, thunkAPI) => {
  try {
    const res = await apiRequest('POST', API_URL, data,true);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updatePatient = createAsyncThunk('patients/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await apiRequest('PUT', `${API_URL}/${id}`, data,true);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const deletePatient = createAsyncThunk('patients/delete', async (id, thunkAPI) => {
  try {
  const res =  await apiRequest('DELETE', `${API_URL}/${id}`,null,true);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// New: Fetch Patient Stats
export const fetchPatientStats = createAsyncThunk('patients/fetchStats', async (_, thunkAPI) => {
  try {
    const res = await apiRequest('GET', `${API_URL}/stats/data`, null, true);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Slice
const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    selectedPatient: null, // ← new
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by patientCode
.addCase(fetchPatientByCode.pending, (state) => {
  state.loading = true;
  state.selectedPatient = null;
  state.error = null;
})
.addCase(fetchPatientByCode.fulfilled, (state, action) => {
  state.loading = false;
  state.selectedPatient = action.payload;
})
.addCase(fetchPatientByCode.rejected, (state, action) => {
  state.loading = false;
  state.selectedPatient = null;
  state.error = action.payload;
})

      // Create
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.unshift(action.payload);
      })

      // Update
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })

      // Delete
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter((p) => p._id !== action.payload);
      })

      // Stats
      .addCase(fetchPatientStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default patientSlice.reducer;
