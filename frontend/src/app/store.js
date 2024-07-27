import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "../features/ProfileSlice";
import CampaignReducer from "../features/CampaignSlice"
import CampaignDetailsReducer from "../features/CampaignDetails";
import CategoryReducer from "../features/CategoriesSlice"
import authReducer from "../features/authSlice"

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        campaign:CampaignReducer,
        campaigndetails:CampaignDetailsReducer,
        Category: CategoryReducer,
        auth:authReducer
      },
});

export default store;
