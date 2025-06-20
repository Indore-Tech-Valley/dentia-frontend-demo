import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../utils/utils';
import { FEEDBACK_API_URL,ADMIN_FEEDBACK_API_URL } from '../../../utils/config';

// POST: Submit Feedback
export const submitFeedback = createAsyncThunk(
  'feedback/submit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', FEEDBACK_API_URL, data, false);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET: Fetch All Feedbacks (admin only)
export const fetchFeedbacks = createAsyncThunk(
  'feedback/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', ADMIN_FEEDBACK_API_URL, null, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// PATCH: Update Feedback
export const updateFeedback = createAsyncThunk(
  'feedback/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiRequest('PATCH', `${ADMIN_FEEDBACK_API_URL}/${id}`, data, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// DELETE: Delete Feedback
export const deleteFeedback = createAsyncThunk(
  'feedback/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest('DELETE', `${ADMIN_FEEDBACK_API_URL}/${id}`, null, true);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearFeedbackState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Submit Feedback
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.feedbacks.push(action.payload);
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Feedbacks
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Feedback
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.feedbacks.findIndex(f => f._id === action.payload._id);
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.feedbacks = state.feedbacks.filter(f => f._id !== action.payload);
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;
