import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';

const initialState = {
    Category: [],
    loading: false,
    error: null,
    success: false,
    CampaignsByCategory:[],
    CampaignLoading: false,
    CampaignError: null,
    CampaignSuccess: false,
}

  export const fetchcategorys = createAsyncThunk(
    'campaigns/Category',
    async () => {
      try {
        const response = await api.get(`/api/campaign/categories/`);
        return response.data.data;
      } catch (error) {
        console.log(error);
        throw new Error(err.response?.data || 'Failed to fetch campaigns');
      }
    }
  );
  
  export const fetchcampaignbycategory = createAsyncThunk(
    'campaigns/Category/list',
    async (category_id) => {
      try {
        const response = await api.get(`/api/campaign/category/${category_id}`);
        console.log(response.data,"fetched list by categorys");
        return response.data.data;
      } catch (error) {
        console.log(error);
        throw new Error(err.response?.data || 'Failed to fetch campaigns');
      }
    }
  );

  
const categoryslice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchcategorys.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchcategorys.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.Category = action.payload
        })
        .addCase(fetchcategorys.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
    },
  });
  
  export default categoryslice.reducer;
  