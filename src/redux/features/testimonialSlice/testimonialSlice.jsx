import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../utils/utils"; // utility to handle fetch/axios
import { TESTIMONIAL_API_URL,ADMIN_TESTIMONIAL_API_URL } from "../../../utils/config"; // e.g., "http://localhost:8000/api/testimonials"

// GET all testimonials
export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiRequest("GET", TESTIMONIAL_API_URL, null, false);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET all testimonials (admin)
export const fetchAdminTestimonials = createAsyncThunk(
  "testimonial/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiRequest("GET", ADMIN_TESTIMONIAL_API_URL, null, true);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// POST a testimonial
export const createTestimonial = createAsyncThunk(
  "testimonial/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiRequest("POST", ADMIN_TESTIMONIAL_API_URL, data, true);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PATCH/UPDATE testimonial
export const updateTestimonial = createAsyncThunk(
  "testimonial/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await apiRequest("PATCH", `${ADMIN_TESTIMONIAL_API_URL}/${id}`, data, true);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE testimonial
export const deleteTestimonial = createAsyncThunk(
  "testimonial/delete",
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest("DELETE", `${ADMIN_TESTIMONIAL_API_URL}/${id}`, null, true);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
initialState: {
  testimonials: [],
  adminTestimonials: [], // 👈 for admin view
  loading: false,
  error: null,
},
  reducers: {
    clearTestimonialError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.loading = false;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(fetchAdminTestimonials.pending, (state) => {
  state.loading = true;
})
.addCase(fetchAdminTestimonials.fulfilled, (state, action) => {
  state.loading = false;
  state.adminTestimonials = action.payload;
})
.addCase(fetchAdminTestimonials.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


.addCase(createTestimonial.fulfilled, (state, action) => {
  state.testimonials.push(action.payload);
  state.adminTestimonials.push(action.payload); // update admin list too
})


.addCase(updateTestimonial.fulfilled, (state, action) => {
  const index = state.testimonials.findIndex((t) => t._id === action.payload._id);
  if (index !== -1) state.testimonials[index] = action.payload;

  const adminIndex = state.adminTestimonials.findIndex((t) => t._id === action.payload._id);
  if (adminIndex !== -1) state.adminTestimonials[adminIndex] = action.payload;
})


.addCase(deleteTestimonial.fulfilled, (state, action) => {
  state.testimonials = state.testimonials.filter((t) => t._id !== action.payload);
  state.adminTestimonials = state.adminTestimonials.filter((t) => t._id !== action.payload);
});
  },
});

export const { clearTestimonialError } = testimonialSlice.actions;
export default testimonialSlice.reducer;
