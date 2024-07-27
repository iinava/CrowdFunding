import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../lib/constants";
import {jwtDecode} from "jwt-decode";

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!accessToken) {
    return thunkAPI.rejectWithValue("No access token available");
  }

  try {
    const decoded = jwtDecode(accessToken);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now && refreshToken) {

      const res = await api.post("/api/user/refresh/", { refresh: refreshToken });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        return { accessToken: res.data.access };
      } else {
        return thunkAPI.rejectWithValue("Unable to refresh token");
        console.log("Unable to refresh token");
      }
    } else if (tokenExpiration >= now) {

      return { accessToken };

    } else {
        console.log("tokenn expired or not available");
      return thunkAPI.rejectWithValue("Token expired and no refresh token available");
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthorized: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state) => {
      state.isAuthorized = null; 
    });
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.isAuthorized = true; 
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isAuthorized = false; 
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
