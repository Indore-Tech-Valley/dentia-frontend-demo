import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotifications = createAsyncThunk(
  'notification/fetch',
  async () => {
    const res = await axios.get('http://localhost:8000/api/notify');
    console.log(res)
    return res;
  }
);

export const markAllSeen = createAsyncThunk(
  'notification/markAllSeen',
  async () => {
    const res = await axios.put('http://localhost:8000/api/notify/mark-all-seen');
    return res.data;
  }
);


const notificationSlice = createSlice({
  name: 'notification',
  initialState: { list: [], loading: false },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, (s) => { s.loading = true; })
      .addCase(fetchNotifications.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.data;
      })
      .addCase(fetchNotifications.rejected, (s) => {
        s.loading = false;
      })
      .addCase(markAllSeen.fulfilled, (s) => {
        s.list = s.list.map(n => ({ ...n, seen: true }));
      });
  }
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
