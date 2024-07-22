import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';

const initialState = {
    campaigndetails: {},
    creatordetails:{},
    loading: false,
    error: null,
    success: false
}

  export const fetchcampaigndetails = createAsyncThunk(
    'campaigns/campaigndetails',
    async (slug) => {
      try {
        const response = await api.get(`/api/campaign/viewcampaign/${slug}`);
        // console.log(response.data.data,"fetched details")
        return response.data.data
      } catch (error) {
        console.log(error);
        throw new Error(err.response?.data || 'Failed to fetch campaigns');
      }
    }
  );

  
const CampaignDetails = createSlice({
    name: 'campaigndetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchcampaigndetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchcampaigndetails.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.campaigndetails = action.payload.campaign
          state.creatordetails = action.payload.profile
        })
        .addCase(fetchcampaigndetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
    },
  });
  
  export default CampaignDetails.reducer;
  