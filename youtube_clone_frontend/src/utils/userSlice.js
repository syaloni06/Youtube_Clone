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
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
