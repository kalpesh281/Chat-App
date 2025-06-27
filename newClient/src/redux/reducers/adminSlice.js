import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Server } from "../../constant/config";

// Create axios instance with baseURL and withCredentials: true
const adminApi = axios.create({
  baseURL: `${Server}/admin`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Async thunks for admin dashboard APIs
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/stats");
    //   console.log(res.data, "Dashboard stats fetched successfully");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/allUsers");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAllGroups = createAsyncThunk(
  "admin/fetchAllGroups",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/allGroups");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAllMessages = createAsyncThunk(
  "admin/fetchAllMessages",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/allMessages");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  dashboardStats: null,
  users: [],
  groups: [],
  messages: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      // Dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("Dashboard stats fetched:",action);
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // All users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log("All users fetched:", action.payload);  
        state.users = action.payload.data?.users || [];
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // All groups
      .addCase(fetchAllGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.data?.groups || [];
      })
      .addCase(fetchAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // All messages
      .addCase(fetchAllMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.data?.messages || [];
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
