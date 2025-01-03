import { createVideo, getAllVideos, getVideoById, getVideoByChannelId, updateVideo, deleteVideo, addComment, updateComment, deleteComment} from "../Controller/videoController.js";
import {auth} from "../Middleware/auth.js";
export const videoRoutes = (app) => {
  app.post("/videos", createVideo); // Create a new video
  app.get("/videos", auth, getAllVideos); // Get all videos
  app.get("/videos/:videoId", auth, getVideoById); // Get a single video by ID
  app.get("/videos/channel/:channelId", getVideoByChannelId);
  app.put("/videos/:videoId", updateVideo); // Update a video by ID
  app.delete("/videos/:videoId", deleteVideo); // Delete a video by ID
  app.put("/videos/addComments/:videoId", addComment); // Add a comment to a video
  app.put("/videos/updateComments/:videoId", updateComment);
  app.put("/videos/deleteComments/:videoId", deleteComment);
};
