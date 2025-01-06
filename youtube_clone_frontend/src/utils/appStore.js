import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import the user slice reducer
import videoReducer from "./videoSlice"; // Import the video slice reducer

// Configure the Redux store
const userStore = configureStore({
  reducer: {
    // Combine the reducers into a single root reducer
    user: userReducer, // Add the user slice to handle user-related state
    videos: videoReducer, // Add the video slice to handle video-related state
  },
});

export default userStore; // Export the store for use throughout the application
