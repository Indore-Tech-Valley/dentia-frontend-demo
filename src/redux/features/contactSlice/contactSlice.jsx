import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../utils/utils';
import { CONTACT_API_URL, ADMIN_CONTACT_API_URL } from '../../../utils/config';

// Create a new contact query
export const createContact = createAsyncThunk(
  'contact/create',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await apiRequest('POST', CONTACT_API_URL, contactData, false);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch all contact queries (admin)
export const fetchContacts = createAsyncThunk(
  'contact/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('GET', ADMIN_CONTACT_API_URL, null, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update contact query by ID (admin)
export const updateContact = createAsyncThunk(
  'contact/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiRequest('PATCH', `${ADMIN_CONTACT_API_URL}/${id}`, data, true);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reply to a contact message by ID (admin)
export const replyContact = createAsyncThunk(
  'contact/reply',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(id,data)
      const response = await apiRequest(
        'POST',
        `${ADMIN_CONTACT_API_URL}/reply/${id}`,
        data,
        true
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Delete contact query by ID (admin)
export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiRequest('DELETE', `${ADMIN_CONTACT_API_URL}/${id}`, null, true);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearContactState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
.addCase(updateContact.pending, (state) => {
  state.loading = true;
  state.success = false;
})
.addCase(updateContact.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  const index = state.contacts.findIndex(c => c._id === action.payload.data._id);
  if (index !== -1) {
    state.contacts[index] = action.payload.data;
  }
})
.addCase(updateContact.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

      // Delete
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contacts = state.contacts.filter((c) => c._id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reply
.addCase(replyContact.pending, (state) => {
  state.loading = true;
  state.success = false;
})
.addCase(replyContact.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  const index = state.contacts.findIndex(c => c._id === action.payload.data._id);
  if (index !== -1) {
    state.contacts[index] = action.payload.data;
  }
})
.addCase(replyContact.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;
