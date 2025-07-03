import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../utils/utils";
import { ADMIN_DASHBOARD_SUMMARY_API } from "../../../utils/config";

// 📊 Fetch Dashboard Summary
export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchDashboardSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiRequest("GET", ADMIN_DASHBOARD_SUMMARY_API, null, true);
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to fetch dashboard summary");
    }
  }
);

// 🧩 Slice
const dashboardSummarySlice = createSlice({
  name: "dashboard",
  initialState: {
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDashboardSummary: (state) => {
      state.summary = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardSummary } = dashboardSummarySlice.actions;
export default dashboardSummarySlice.reducer;
