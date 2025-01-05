import mongoose from "mongoose";

// Define the schema for comments
const commentSchema = new mongoose.Schema({
    // Unique identifier for the comment
    commentId: {
        type: String,
        required: true // Ensures the commentId field is mandatory
    },
    // ID of the user who made the comment
    userId: {
        type: String,
        required: true // Ensures the userId field is mandatory
    },
    // Name of the user who made the comment
    userName: {
        type: String,
        required: true // Ensures the userName field is mandatory
    },
    // Avatar of the user who made the comment
    userAvatar: {
        type: String,
        required: true // Ensures the userAvatar field is mandatory
    },
    // The text content of the comment
    text: {
        type: String,
        required: true // Ensures the text field is mandatory
    },
    // Timestamp of when the comment was made
    timestamp: {
        type: Date,
        required: true // Ensures the timestamp field is mandatory
    }
});

// Define the schema for videos
const videoSchema = new mongoose.Schema({
    // Unique identifier for the video
    videoId: {
        type: String,
        required: true // Ensures the videoId field is mandatory
    },
    // URL of the video
    videoUrl: {
        type: String,
        required: true // Ensures the videoUrl field is mandatory
    },
    // Title of the video
    title: {
        type: String,
        required: true // Ensures the title field is mandatory
    },
    // URL of the video's thumbnail image
    thumbnailUrl: {
        type: String,
        required: true // Ensures the thumbnailUrl field is mandatory
    },
    // Description of the video
    description: {
        type: String,
        required: true, // Ensures the description field is mandatory
        minlength: 10 // Minimum length for the description
    },
    // Category of the video (e.g., music, education)
    category: {
        type: String,
        required: true // Ensures the category field is mandatory
    },
    // ID of the channel that uploaded the video
    channelId: {
        type: String,
        required: true // Ensures the channelId field is mandatory
    },
    // Logo of the channel that uploaded the video
    channelLogo: {
        type: String,
        required: true // Ensures the channelLogo field is mandatory
    },
    // Name of the uploader of the video
    uploader: {
        type: String,
        required: true // Ensures the uploader field is mandatory
    },
    // Number of subscribers the channel has
    subscribers: {
        type: Number,
        required: true, // Ensures the subscribers field is mandatory
        default: 0 // Default value if not specified
    },
    // Number of views the video has
    views: {
        type: Number,
        required: true, // Ensures the views field is mandatory
        default: 0 // Default value if not specified
    },
    // Number of likes the video has received
    likes: {
        type: Number,
        required: true, // Ensures the likes field is mandatory
        default: 0 // Default value if not specified
    },
    // Number of dislikes the video has received
    dislikes: {
        type: Number,
        required: true, // Ensures the dislikes field is mandatory
        default: 0 // Default value if not specified
    },
    // Date when the video was uploaded
    uploadDate: {
        type: Date,
        required: true // Ensures the uploadDate field is mandatory
    },
    // Array of comments associated with the video
    comments: [commentSchema] // Embedded schema for comments
});

// Create the Video model using the videoSchema
const videoModel = mongoose.model('video', videoSchema);

// Export the Video model to be used in other parts of the application
export default videoModel;
