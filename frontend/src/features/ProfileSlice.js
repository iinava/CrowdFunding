import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';

const initialState = {
  profiledata: {},
  loading: false,
  error: null,
  updationloader:false,
  updationerror: null,
  updationsuccess: false,
};

//  for fetching profile

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    try {
      const response = await api.get('/api/user/profile/');
      return response.data.data
    } catch (err) {
      throw new Error(err.response?.data || 'Failed to fetch profile');
    }
  }
);

// for updating profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData) => {
    try {
      const response = await api.put('/api/user/profile/', profileData);
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      // console.log(err);
      throw new Error(err.response?.data || 'Failed to update profile');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiledata = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updationloader = true;
        state.updationerror = null;
        state.updationsuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updationloader = false;
        state.profiledata = action.payload;
        state.updationsuccess = true;
        state.updationerror = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updationloader = false;
        state.updationerror = "could not update profile";
        state.updationsuccess = false;
      });
  },
});

export default profileSlice.reducer;
