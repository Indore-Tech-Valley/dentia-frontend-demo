import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../utils/utils';
import { FAQ_API, ADMIN_FAQ_API } from '../../../utils/config';

// Create FAQ
export const createFaq = createAsyncThunk(
  'faq/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', ADMIN_FAQ_API, data, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get All FAQs (public)
export const fetchFaqs = createAsyncThunk(
  'faq/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', FAQ_API,null, false);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update FAQ
export const updateFaq = createAsyncThunk(
  'faq/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiRequest('PUT', `${ADMIN_FAQ_API}/${id}`, data, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete FAQ
export const deleteFaq = createAsyncThunk(
  'faq/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest('DELETE', `${ADMIN_FAQ_API}/${id}`, null, true);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    faqs: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearFaqState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createFaq.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.faqs.push(action.payload);
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateFaq.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.faqs.findIndex(f => f._id === action.payload._id);
        if (index !== -1) state.faqs[index] = action.payload;
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteFaq.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = state.faqs.filter(f => f._id !== action.payload);
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFaqState } = faqSlice.actions;
export default faqSlice.reducer;
