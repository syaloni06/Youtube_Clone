import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: "videos",
    initialState: {
        data: [], // Stores user sign-in information (e.g., token, name, email, etc.)
    },
    reducers: {
        setVideoList: (state, action) => {
            state.data = action.payload; // Sets the user sign-in information
        },
        clearVideoList: (state) => {
            state.data = []; // Clears the user sign-in information
        },
    },
});

export const { setVideoList, clearVideoList } = videoSlice.actions;

export default videoSlice.reducer;
