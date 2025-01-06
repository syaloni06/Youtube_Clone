import mongoose from "mongoose";

// Define a schema for a channel
const channelSchema = new mongoose.Schema({
  // Unique identifier for the channel
  channelId: {
    type: String,
    required: true, // The field is mandatory
    unique: true // Ensures no duplicate channel IDs
  },

  // Name of the channel
  channelName: {
    type: String,
    required: true, // The field is mandatory
    unique: true // Ensures no duplicate channel names
  },

  // Owner of the channel (user ID or name)
  owner: {
    type: String,
    required: true // The field is mandatory
  },

  // Handle for the channel (e.g., a unique username or alias)
  handle: {
    type: String,
    required: true, // The field is mandatory
    unique: true // Ensures no duplicate handles
  },

  // Description of the channel
  description: {
    type: String,
    required: true, // The field is mandatory
    minlength: 20 // Enforces a minimum length for the description
  },

  // URL or path to the channel's banner image
  channelBanner: {
    type: String,
    required: true // The field is mandatory
  },

  // URL or path to the channel's logo
  channelLogo: {
    type: String,
    required: true // The field is mandatory
  },

  // Number of subscribers for the channel
  subscribers: {
    type: Number,
    required: true, // The field is mandatory
    default: 0 // Default value if not provided
  },
});

// Create a Mongoose model for the channel schema
const channelModel = mongoose.model('channel', channelSchema);

// Export the channel model to use in other parts of the application
export default channelModel;
