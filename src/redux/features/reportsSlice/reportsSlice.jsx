import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_REPORT_API, REPORT_API } from "../../../utils/config";
import { apiRequest, apiRequestMultipart } from "../../../utils/utils";

// 📥 Upload Report (PDF)
export const uploadReport = createAsyncThunk(
  "reports/uploadReport",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await apiRequestMultipart(
        "POST",
        ADMIN_REPORT_API,
        formData,
        true
      );
      console.log(res);
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Upload failed");
    }
  }
);

// 📤 Get All Reports
export const getAllReports = createAsyncThunk(
  "reports/getAllReports",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiRequest("GET", ADMIN_REPORT_API, null, true);

      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Fetch failed");
    }
  }
);

// 📤 Get Reports by Patient Code
export const getReportsByPatientCode = createAsyncThunk(
  "reports/getReportsByPatientCode",
  async (code, { rejectWithValue }) => {
    try {
      const res = await apiRequest("GET", `${REPORT_API}/${code}`, null, false);
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Fetch failed");
    }
  }
);

export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "DELETE",
        `${ADMIN_REPORT_API}/${id}`,
        null,
        true
      );
      return { id, message: res.message }; // ✅ Return expected structure
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Delete failed");
    }
  }
);

// 🛠️ Update Report
export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await apiRequestMultipart(
        "PUT",
        `${ADMIN_REPORT_API}/${id}`,
        formData,
        true
      );
      return res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Update failed");
    }
  }
);

// 📦 Slice
const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearReports: (state) => {
      state.reports = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.unshift(action.payload);
      })
      .addCase(uploadReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getReportsByPatientCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportsByPatientCode.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(getReportsByPatientCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(
          (r) => r._id !== action.payload.id
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reports.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) {
          state.reports[index] = action.payload; // update existing
        }
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReports } = reportsSlice.actions;
export default reportsSlice.reducer;
