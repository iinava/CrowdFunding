import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "../features/ProfileSlice";
import CampaignReducer from "../features/CampaignSlice"

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        campaign:CampaignReducer
      },
});

export default store;
