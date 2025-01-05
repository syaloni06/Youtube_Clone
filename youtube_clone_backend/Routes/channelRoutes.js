import { createChannel, getAllChannels, getChannelById, updateChannel, deleteChannel } from "../Controller/channelController.js";
import { auth } from "../Middleware/auth.js";

// Define the channel-related routes and attach them to the application
export const channelRoutes = (app) => {
  // Route to create a new channel
  // Requires authentication via the `auth` middleware
  app.post("/channels", auth, createChannel); 

  // Route to get all channels
  // Requires authentication via the `auth` middleware
  app.get("/channels", auth, getAllChannels); 

  // Route to get a specific channel by its ID
  // Requires authentication via the `auth` middleware
  app.get("/channels/:channelId", auth, getChannelById); 

  // Route to update a channel by its ID
  // Requires authentication via the `auth` middleware
  app.put("/channels/:channelId", auth, updateChannel); 

  // Route to delete a channel by its ID
  // Requires authentication via the `auth` middleware
  app.delete("/channels/:channelId", auth, deleteChannel); 
};
