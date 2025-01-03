import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null, // Stores user sign-in information (e.g., token, name, email, etc.)
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.data = action.payload; // Sets the user sign-in information
        },
        clearUserInfo: (state) => {
            state.data = null; // Clears the user sign-in information
        },
        updateUserInfo: (state, action) => {
            if (state.data) {
                state.data = { ...state.data, ...action.payload }; // Merges the existing data with the new fields
            }
        },
    },
});

export const { setUserInfo, clearUserInfo, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
