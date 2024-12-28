import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    channelId: {
        type: String,
        required: true
    },
    channelLogo: {
        type: String,
        required: true
    },
    uploader: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    },
    uploadDate: {
        type: Date,
        required: true
    },
    comments: [commentSchema] // Embedded schema for comments
});

const videoModel = mongoose.model('video', videoSchema);

export default videoModel;