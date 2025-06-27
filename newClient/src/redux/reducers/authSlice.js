import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Server } from "../../constant/config";

// Configure axios
const api = axios.create({
  baseURL: `${Server}/user`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Async thunks for API calls
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Signup failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

export const checkCredentials = createAsyncThunk(
  "auth/checkCreds",
  async (credData, { rejectWithValue }) => {
    try {
      const response = await api.post("/check-creds", credData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Credential check failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Logout failed"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/me");
      return response.data;
    } catch (error) {
      // Handle 401 Unauthorized specifically
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized");
      }

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to get user info"
      );
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loader: true,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loader = false;
      state.error = null;
    },
    userNotExists: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loader = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Note: Signup doesn't automatically log in the user
        // You might want to redirect to login page after successful signup
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loader = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Check credentials cases
      .addCase(checkCredentials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkCredentials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loader = false;
        state.error = null;
      })
      .addCase(checkCredentials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.loader = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get current user cases
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loader = false;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.loader = false;
        // Don't set error for authentication check failures
        if (action.payload !== "Unauthorized") {
          state.error = action.payload;
        } else {
          state.error = null;
        }
      });
  },
});

export default authSlice;
export const { userExists, userNotExists, clearError, setLoader } =
  authSlice.actions;
