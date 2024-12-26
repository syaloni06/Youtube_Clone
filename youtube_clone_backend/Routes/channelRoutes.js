import { createChannel, getAllChannels, getChannelById, updateChannel, deleteChannel } from "../Controller/channelController.js";

export const channelRoutes = (app) => {
  app.post("/channels", createChannel); // Create a new channel
  app.get("/channels", getAllChannels); // Get all channels
  app.get("/channels/:channelId", getChannelById); // Get a single channel by ID
  app.put("/channels/:channelId", updateChannel); // Update a channel by ID
  app.delete("/channels/:channelId", deleteChannel); // Delete a channel by ID
};
