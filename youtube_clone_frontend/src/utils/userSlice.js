import { createSlice } from "@reduxjs/toolkit"; // Import the `createSlice` function from Redux Toolkit

// Define a slice for managing user-related state
const userSlice = createSlice({
  name: "user", // Name of the slice (used as a namespace for actions)
  initialState: {
    data: null, // Initial state: stores user sign-in information (e.g., token, name, email, etc.), defaults to `null`
  },
  reducers: {
    // Reducer for setting user information after sign-in or registration
    setUserInfo: (state, action) => {
      state.data = action.payload; // Updates the `data` field with the user information from the action payload
    },
    // Reducer for clearing user information, e.g., on sign-out
    clearUserInfo: (state) => {
      state.data = null; // Resets the `data` field to `null`
    },
    // Reducer for updating specific fields in the existing user data
    updateUserInfo: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload }; // Merges the existing user data with the new fields from the action payload
      }
    },
  },
});

// Export the action creators generated for each reducer
export const { setUserInfo, clearUserInfo, updateUserInfo } = userSlice.actions;

// Export the reducer function to be used in the Redux store
export default userSlice.reducer;
