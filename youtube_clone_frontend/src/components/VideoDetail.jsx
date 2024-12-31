import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
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
        const filtervideo = videos.filter(
          (video) => video.videoId !== videoId.id
        );
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
            <h1 className="text-2xl font-bold mb-2">{videoData.title}</h1>
            <div className="flex gap-4 mb-6">
              <img
                src={videoData.channelLogo}
                alt={videoData.uploader}
                className="w-11 h-11 self-center rounded-full"
              />
              <div>
                <p className="font-semibold text-lg line-clamp-1">
                  {videoData.uploader}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(videoData.uploadDate).toLocaleDateString()}
                </p>
              </div>
              <button className="self-center px-4 py-2 bg-black hover:bg-slate-800 text-white font-medium rounded-full shadow-sm transition">
                <span>Subscribe</span>
              </button>
              <div className="flex">
              <div className="flex items-center my-1 gap-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-l-full cursor-pointer shadow-sm">
                <button className="flex items-center rounded-r-none gap-2">
                  <BiSolidLike className="text-2xl" />
                  <span className="font-medium">{videoData.likes}</span>
                </button>
              </div>
              <div className="h-6 w-px self-center bg-gray-300"></div>
              <div className="flex items-center my-1 gap-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-full cursor-pointer shadow-sm">
                <button className="flex items-center cursor-pointer">
                  <BiDislike className="text-2xl" />
                </button>
              </div>
              </div>
              <button className="flex self-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black font-medium rounded-full shadow-sm transition">
                <PiShareFatLight className="text-2xl self-center" />
                <span>Share</span>
              </button>
              <button className="flex self-center p-2 bg-gray-100 hover:bg-gray-200 text-black font-medium rounded-full shadow-sm transition">
              <BsThreeDots className="text-2xl"/>
              </button>
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
          <div
            key={video.id}
            className="flex gap-4 items-start cursor-pointer"
            onClick={() => handleVideoClick(video.videoId)}
          >
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
              <h3 className="text-sm font-semibold line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{video.channelName}</p>
              <p className="text-xs text-gray-500">
                {video.views} views • {video.uploadDate}
              </p>
            </div>

            {/* Options Icon */}
            <div className="ml-auto">
              <button className="text-gray-400 hover:text-gray-600">
              <BsThreeDotsVertical />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;
