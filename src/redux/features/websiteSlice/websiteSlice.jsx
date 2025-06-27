// redux/features/websiteSlice/websiteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, apiRequestMultipart } from '../../../utils/utils';
import { WEBSITE_API } from '../../../utils/config';
import { ADMIN_WEBSITE_API } from '../../../utils/config';



// GET Website Details
export const fetchWebsiteDetails = createAsyncThunk(
  'website/fetchDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', `${WEBSITE_API}`,null,false);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// UPDATE Website Details by ID (with form-data)
export const updateWebsiteDetails = createAsyncThunk(
  'website/updateDetails',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await apiRequestMultipart('PATCH', `${ADMIN_WEBSITE_API}/${id}`, formData,true);
      return response;
    } catch (err) {
      // console.error('Update Error:', err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const websiteSlice = createSlice({
  name: 'website',
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsiteDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsiteDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchWebsiteDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateWebsiteDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWebsiteDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(updateWebsiteDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default websiteSlice.reducer;
