import channelModel from "../Model/channel.js"; // Import the channel model
import { v4 as uuidv4 } from "uuid"; // Import UUID library to generate unique channel IDs

// Function to create a new channel
export const createChannel = async (req, res) => {
  try {
    // Extract channel details from the request body
    const {
      channelName,
      owner,
      handle,
      description,
      channelBanner,
      channelLogo,
    } = req.body;

    // Check if the channel name already exists in the database
    const existingChannel = await channelModel.findOne({ channelName });
    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "Channel ID or name already exists" }); // Return error if the channel name exists
    }

    // Create a new channel instance with the provided details
    const channel = new channelModel({
      channelId: "channel" + uuidv4(),
      channelName: channelName,
      owner: owner,
      handle: handle,
      description: description,
      channelBanner: channelBanner,
      channelLogo: channelLogo,
      subscribers: Math.floor(Math.random() * 1000000) + 1,
    });

    // Save channel to the database
    await channel.save();
    // Send a success response with the created channel
    res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    // Handle any errors that occur during channel creation
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve all channels
export const getAllChannels = async (req, res) => {
  try {
    // Fetch all channels from the database
    const channels = await channelModel.find();
    // Send a success response with the list of channels
    res.status(200).json(channels);
  } catch (error) {
    // Handle any errors that occur while fetching channels
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve a channel by its ID
export const getChannelById = async (req, res) => {
  try {
    // Extract the channelId from the request parameters
    const { channelId } = req.params;
    // Find the channel by its ID
    const channel = await channelModel.findOne({ channelId });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" }); // Return error if the channel is not found
    }
    // Send a success response with the channel details
    res.status(200).json(channel);
  } catch (error) {
    // Handle any errors that occur while fetching the channel
    res.status(500).json({ message: error.message });
  }
};

// Function to update a channel
export const updateChannel = async (req, res) => {
  try {
    // Extract the channelId from the request parameters
    const { channelId } = req.params;
    // Extract the updated fields from the request body
    const updates = req.body;

    // Find the channel by ID and apply the updates
    const channel = await channelModel.findOneAndUpdate(
      { channelId },
      updates,
      { new: true } // Return the updated document
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" }); // Return error if the channel is not found
    }
    // Send a success response with the updated channel
    res.status(200).json({ message: "Channel updated successfully", channel });
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a channel
export const deleteChannel = async (req, res) => {
  try {
    // Extract the channelId from the request parameters
    const { channelId } = req.params;

    // Find and delete the channel by its ID
    const channel = await channelModel.findOneAndDelete({ channelId });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" }); // Return error if the channel is not found
    }
    // Send a success response indicating the channel was deleted
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({ message: error.message });
  }
};
