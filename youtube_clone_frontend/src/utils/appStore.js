import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Adjust the path based on your file structure
import videoReducer from "./videoSlice";
const userStore = configureStore({
    reducer: {
        user: userReducer, // Add the user slice to the store
        videos: videoReducer,
    },
});

export default userStore;
