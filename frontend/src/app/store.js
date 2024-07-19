import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "../features/ProfileSlice";

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
      },
});

export default store;
