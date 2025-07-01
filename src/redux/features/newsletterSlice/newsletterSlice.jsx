import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../utils/utils';
import { NEWSLETTER_API, ADMIN_NEWSLETTER_API } from '../../../utils/config';

// POST: Subscribe to Newsletter
export const subscribeNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', NEWSLETTER_API, data, false);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET: Fetch All Subscriptions (Admin)
export const fetchNewsletters = createAsyncThunk(
  'newsletter/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', ADMIN_NEWSLETTER_API, null, true);
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// send mail to all
export const sendNewsletterToAll = createAsyncThunk(
  'newsletter/sendToAll',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', `${ADMIN_NEWSLETTER_API}/send`, data, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// DELETE: Remove Subscriber (Admin)
export const deleteNewsletter = createAsyncThunk(
  'newsletter/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest('DELETE', `${ADMIN_NEWSLETTER_API}/${id}`, null, true);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState: {
    subscriptions: [],
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  reducers: {
    clearNewsletterState: (state) => {
  state.success = false;
  state.error = null;
  state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Subscribe
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subscriptions.push(action.payload);
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchNewsletters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsletters.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchNewsletters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Newsletter to All
.addCase(sendNewsletterToAll.pending, (state) => {
  state.loading = true;
  state.success = false;
  state.error = null;
  state.message = null;
})
.addCase(sendNewsletterToAll.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  state.message = action.payload;
})
.addCase(sendNewsletterToAll.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.success = false;
})

      // Delete
      .addCase(deleteNewsletter.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(s => s._id !== action.payload);
      })
      .addCase(deleteNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNewsletterState } = newsletterSlice.actions;
export default newsletterSlice.reducer;
