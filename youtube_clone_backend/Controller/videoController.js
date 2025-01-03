import videoModel from "../Model/video.js";
import { v4 as uuidv4 } from "uuid";

export const createVideo = async (req, res) => {
  try {
    const {
      videoUrl,
      title,
      thumbnailUrl,
      description,
      category,
      channelId,
      channelLogo,
      uploader,
      uploadDate,
    } = req.body;
    // Create a new video
    const video = new videoModel({
      videoId: "video" + uuidv4(),
      videoUrl: videoUrl,
      title: title,
      thumbnailUrl: thumbnailUrl,
      description: description,
      category: category,
      channelId: channelId,
      channelLogo: channelLogo,
      uploader: uploader,
      subscribers: Math.floor(Math.random() * 1000000) + 1,
      views: Math.floor(Math.random() * 100000) + 1,
      likes: Math.floor(Math.random() * 1000) + 1,
      dislikes: Math.floor(Math.random() * 100) + 1,
      uploadDate: uploadDate,
    });

    // Save video to the database
    await video.save();

    res.status(201).json({ message: "Video created successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await videoModel.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await videoModel.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideoByChannelId = async (req, res) => {
    try {
      const { channelId } = req.params;
      const video = await videoModel.find({ channelId });
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const updates = req.body;

    // Find and update the video
    const video = await videoModel.findOneAndUpdate(
      { videoId },
      updates,
      { new: true } // Return the updated document
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Find and delete the video
    const video = await videoModel.findOneAndDelete({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { userId, userName, userAvatar, text, timestamp } = req.body;

    // Find the video by videoId
    const video = await videoModel.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Add the comment to the video
    video.comments.push({
      commentId: "comment" + uuidv4(),
      userId,
      userName,
      userAvatar,
      text,
      timestamp,
    });
    await video.save();

    res.status(200).json({ message: "Comment added successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { commentId, text, timestamp } = req.body; // `text` contains the updated comment text

    // Find the video by videoId
    const video = await videoModel.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find the comment within the video's comments array
    const comment = video.comments.find((c) => c.commentId === commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Update the comment text
    comment.text = text;
    comment.timestamp = timestamp;
    // Save the updated video
    await video.save();

    res.status(200).json({ message: "Comment updated successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
    try {
      const { videoId } = req.params;
      const { commentId } = req.body; // `commentId` specifies the comment to be deleted
  
      // Find the video by videoId
      const video = await videoModel.findOne({ videoId });
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
  
      // Find the comment index within the video's comments array
      const commentIndex = video.comments.findIndex((c) => c.commentId === commentId);
      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      // Remove the comment from the array
      video.comments.splice(commentIndex, 1);
  
      // Save the updated video
      await video.save();
  
      res.status(200).json({ message: "Comment deleted successfully", video });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  