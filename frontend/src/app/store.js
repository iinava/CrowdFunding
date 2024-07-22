import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "../features/ProfileSlice";
import CampaignReducer from "../features/CampaignSlice"
import CampaignDetailsReducer from "../features/CampaignDetails";

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        campaign:CampaignReducer,
        campaigndetails:CampaignDetailsReducer
      },
});

export default store;
