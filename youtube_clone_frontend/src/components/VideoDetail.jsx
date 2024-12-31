import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaThumbsUp, FaThumbsDown, FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const VideoDetail = () => {
  const videoId = useParams(); // Get the videoId from the URL
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredVideo, setFilteredVideo] = useState([]);
  const user = useSelector((state) => state.user.data);
  const videos = useSelector((state) => state.videos.data);
  const navigate = useNavigate();
  const handleVideoClick = (videoId) => {
    // Navigate to the video detail page when a video is clicked
    navigate(`/video/${videoId}`);
  };
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/videos/${videoId.id}`,
          {
            headers: {
              Authorization: token, // Pass token in the Authorization header
            },
          }
        );
        setVideoData(response.data); // Assuming the API returns a single video object
        const filtervideo = videos.filter((video) => (video.videoId !== videoId.id));
        setFilteredVideo(filtervideo);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError("Failed to fetch video details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [user?.token, videoId, videos]);

  return (
    <div className="flex my-16 mx-24">
      <div className="flex flex-col w-3/5 mr-6 rounded-lg">
        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading video details...</p>
        ) : videoData ? (
          <>
            {/* Video Player */}
            <div className="relative w-full mx-auto mb-4">
              <ReactPlayer
                url={videoData.videoUrl} // Assuming `videoUrl` is the direct link to the video file
                controls={true}
                playing={true}
                width="100%" // Adjust width (e.g., 100% for responsive design)
                height="420px" // Set a specific height
                className="rounded-2xl overflow-hidden aspect-video"
              />
            </div>

            {/* Video Info */}
            <div className="flex gap-4 mb-6">
              <img
                src={videoData.channelLogo}
                alt={videoData.uploader}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold mb-1">{videoData.title}</h1>
                <p className="text-gray-600">
                  Uploaded by {videoData.uploader}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(videoData.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <FaEye className="text-xl" />
                <span>{videoData.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <FaThumbsUp className="text-xl" />
                <span>{videoData.likes.toLocaleString()} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <FaThumbsDown className="text-xl" />
                <span>{videoData.dislikes.toLocaleString()} dislikes</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{videoData.description}</p>
          </>
        ) : (
          <p className="text-center text-gray-500">No video details found.</p>
        )}
      </div>
      <div className="space-y-4">
  {filteredVideo.map((video) => (
    <div key={video.id} className="flex gap-4 items-start cursor-pointer" onClick={() => handleVideoClick(video.videoId)}>
      {/* Video Thumbnail */}
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-44 h-28 rounded-lg"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
          {video.duration}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{video.channelName}</p>
        <p className="text-xs text-gray-500">
          {video.views} views • {video.uploadDate}
        </p>
      </div>

      {/* Options Icon */}
      <div className="ml-auto">
        <button className="text-gray-400 hover:text-gray-600">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default VideoDetail;
