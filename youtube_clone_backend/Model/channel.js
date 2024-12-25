import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: {
        type: string,
        required: ture
    }
})