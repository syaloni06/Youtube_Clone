import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelId: {
        type: String,
        required: true,
        unique: true
    },
    channelName: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    channelBanner: {
        type: String,
        required: true
    },
    subscribers: {
        type: Number,
        required: true,
        default: 0
    },
    videos: [{
        type: String
    }]
});

const channelModel = mongoose.model('channel', channelSchema);

export default channelModel;