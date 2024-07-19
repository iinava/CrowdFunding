import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';

const initialState = {
    campaign: {},
    loading: false,
    error: null,
    success: false
}

  export const fetchPaginatedCampaigns = createAsyncThunk(
    'campaigns/fetchPaginatedCampaigns',
    async (page = 1) => {
      try {
        const response = await api.get(`/api/campaign/viewallcampaigns/?page=${page}`);
        // console.log(response.data,"fetched campaigns")
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error(err.response?.data || 'Failed to fetch campaigns');
      }
    }
  );

  
const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPaginatedCampaigns.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPaginatedCampaigns.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.campaign = action.payload
        })
        .addCase(fetchPaginatedCampaigns.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
    },
  });
  
  export default campaignSlice.reducer;
  