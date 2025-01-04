import channelModel from "../Model/channel.js";
import { v4 as uuidv4 } from "uuid";

export const createChannel = async (req, res) => {
  try {
    const { channelName, owner, handle, description, channelBanner, channelLogo } = req.body;

    // Check if the channel name or ID already exists
    const existingChannel = await channelModel.findOne({channelName});
    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "Channel ID or name already exists" });
    }

    // Create a new channel
    const channel = new channelModel({
      channelId: "channel" + uuidv4(),
      channelName: channelName,
      owner: owner,
      handle: handle,
      description: description,
      channelBanner: channelBanner,
      channelLogo: channelLogo,
      subscribers:  Math.floor(Math.random() * 1000000) + 1 
    });

    // Save channel to the database
    await channel.save();

    res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllChannels = async (req, res) => {
  try {
    const channels = await channelModel.find();
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await channelModel.findOne({ channelId });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const updates = req.body;

    // Find and update the channel
    const channel = await channelModel.findOneAndUpdate(
      { channelId },
      updates,
      { new: true } // Return the updated document
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json({ message: "Channel updated successfully", channel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    // Find and delete the channel
    const channel = await channelModel.findOneAndDelete({ channelId });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
