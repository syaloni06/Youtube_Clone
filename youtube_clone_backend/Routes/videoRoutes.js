import { 
  createVideo, 
  getAllVideos, 
  getVideoById, 
  getVideoByChannelId, 
  updateVideo, 
  deleteVideo, 
  addComment, 
  updateComment, 
  deleteComment 
} from "../Controller/videoController.js";
import { auth } from "../Middleware/auth.js";

// Define the video-related routes and attach them to the application
export const videoRoutes = (app) => {
  // Route to create a new video
  // Requires authentication via the `auth` middleware
  app.post("/videos", auth, createVideo); 

  // Route to get all videos
  // Requires authentication via the `auth` middleware
  app.get("/videos", auth, getAllVideos); 

  // Route to get a single video by its ID
  // Requires authentication via the `auth` middleware
  app.get("/videos/:videoId", auth, getVideoById); 

  // Route to get all videos by a specific channel ID
  // Requires authentication via the `auth` middleware
  app.get("/videos/channel/:channelId", auth, getVideoByChannelId); 

  // Route to update a video by its ID
  // Requires authentication via the `auth` middleware
  app.put("/videos/:videoId", auth, updateVideo); 

  // Route to delete a video by its ID
  // Requires authentication via the `auth` middleware
  app.delete("/videos/:videoId", auth, deleteVideo); 

  // Route to add a comment to a specific video
  // This route does not require authentication (consider reviewing for consistency)
  app.put("/videos/addComments/:videoId", addComment); 

  // Route to update a specific comment on a video
  // This route does not require authentication (consider reviewing for consistency)
  app.put("/videos/updateComments/:videoId", updateComment); 

  // Route to delete a specific comment from a video
  // This route does not require authentication (consider reviewing for consistency)
  app.put("/videos/deleteComments/:videoId", deleteComment); 
};
