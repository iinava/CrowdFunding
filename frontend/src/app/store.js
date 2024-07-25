import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "../features/ProfileSlice";
import CampaignReducer from "../features/CampaignSlice"
import CampaignDetailsReducer from "../features/CampaignDetails";
import CategoryReducer from "../features/CategoriesSlice"

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        campaign:CampaignReducer,
        campaigndetails:CampaignDetailsReducer,
        Category: CategoryReducer,
      },
});

export default store;
