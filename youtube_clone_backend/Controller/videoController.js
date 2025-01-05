import videoModel from "../Model/video.js"; // Import the video model
import { v4 as uuidv4 } from "uuid"; // Import UUID library to generate unique IDs

// Function to create a new video
export const createVideo = async (req, res) => {
  try {
    // Extract video details from the request body
    const {
      videoUrl,
      title,
      thumbnailUrl,
      description,
      category,
      channelId,
      channelLogo,
      uploader
    } = req.body;
    // Create a new video instance with the provided details
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
      uploadDate: new Date(),
    });

    // Save the video to the database
    await video.save();
// Send a success response with the created video
    res.status(201).json({ message: "Video created successfully", video });
  } catch (error) {
    // Handle any errors during video creation
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve all videos
export const getAllVideos = async (req, res) => {
  try {
     // Fetch all videos from the database
    const videos = await videoModel.find();
    // Send a success response with the list of videos
    res.status(200).json(videos);
  } catch (error) {
    // Handle any errors during fetching videos
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve a video by its ID
export const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params; // Extract the videoId from request parameters
// Find the video by its ID
    const video = await videoModel.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" }); // Return error if video is not found
    }
// Send a success response with the video details
    res.status(200).json(video);
  } catch (error) {
    // Handle any errors during fetching the video
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve videos by channel ID
export const getVideoByChannelId = async (req, res) => {
    try {
      const { channelId } = req.params; // Extract channelId from request parameters
      // Find all videos uploaded by the channel
      const video = await videoModel.find({ channelId });
      if (!video) {
        return res.status(404).json({ message: "Video not found" }); // Return error if no videos are found
      }
      // Send a success response with the list of videos
      res.status(200).json(video);
    } catch (error) {
      // Handle any errors during fetching the videos
      res.status(500).json({ message: error.message });
    }
  };

// Function to update a video's details
export const updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params; // Extract videoId from request parameters
    const updates = req.body; // Extract updated fields from request body

    // Find and update the video with new details
    const video = await videoModel.findOneAndUpdate(
      { videoId },
      updates,
      { new: true } // Return the updated document
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" }); // Return error if video is not found
    }
// Send a success response with the updated video
    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
     // Handle any errors during video update
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a video
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params; // Extract videoId from request parameters

    // Find and delete the video by its ID
    const video = await videoModel.findOneAndDelete({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" }); // Return error if video is not found
    }
// Send a success response indicating the video was deleted
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    // Handle any errors during video deletion
    res.status(500).json({ message: error.message });
  }
};

// Function to add a comment to a video
export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params; // Extract videoId from request parameters
    const { userId, userName, userAvatar, text, timestamp } = req.body; // Extract comment details from request body

    // Find the video by videoId
    const video = await videoModel.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" }); // Return error if video is not found
    }

    // Add the comment to the video's comments array
    video.comments.push({
      commentId: "comment" + uuidv4(),
      userId: userId,
      userName: userName,
      userAvatar: userAvatar,
      text: text,
      timestamp: new Date(),
    });

    // Save the updated video with the new comment
    await video.save();
// Send a success response with the updated video
    res.status(200).json({ message: "Comment added successfully", video });
  } catch (error) {
    // Handle any errors during comment addition
    res.status(500).json({ message: error.message });
  }
};

// Function to update a comment on a video
export const updateComment = async (req, res) => {
  try {
    const { videoId } = req.params; // Extract videoId from request parameters
    const { commentId, text, timestamp } = req.body; // Extract comment ID and updated text from request body

    // Find the video by videoId
    const video = await videoModel.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" }); // Return error if video is not found
    }

    // Find the comment within the video's comments array
    const comment = video.comments.find((c) => c.commentId === commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" }); // Return error if comment is not found
    }

    // Update the comment text
    comment.text = text;
    comment.timestamp = timestamp; // Update the timestamp
    // Save the updated video
    await video.save();

    // Send a success response with the updated video
    res.status(200).json({ message: "Comment updated successfully", video });
  } catch (error) {
    // Handle any errors during comment update
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a comment from a video
export const deleteComment = async (req, res) => {
    try {
      const { videoId } = req.params; // Extract videoId from request parameters
      const { commentId } = req.body; // Extract commentId from request body
  
      // Find the video by videoId
      const video = await videoModel.findOne({ videoId });
      if (!video) {
        return res.status(404).json({ message: "Video not found" }); // Return error if video is not found
      }
  
      // Find the index of the comment in the video's comments array
      const commentIndex = video.comments.findIndex((c) => c.commentId === commentId);
      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" }); // Return error if comment is not found
      }
  
      // Remove the comment from the array
      video.comments.splice(commentIndex, 1);
  
      // Save the updated video
      await video.save();
  
      // Send a success response indicating the comment was deleted
      res.status(200).json({ message: "Comment deleted successfully", video });
    } catch (error) {
      // Handle any errors during comment deletion
      res.status(500).json({ message: error.message });
    }
  };
  