import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

const VideoDetail = () => {
  const videoId = useParams(); // Get the videoId from the URL
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      const token = user?.token;
      try {
        const response = await axios.get(`http://localhost:5100/videos/${videoId.id}`, {
          headers: {
            Authorization: token, // Pass token in the Authorization header
          },
        });
        setVideoData(response.data); // Assuming the API returns a single video object
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError("Failed to fetch video details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [user?.token, videoId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-8">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg border hover:shadow-xl p-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700 text-lg font-medium gap-2 mb-4"
        >
          &larr; Back
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading video details...</p>
        ) : videoData ? (
          <>
            {/* Video Player */}
            <div className="relative w-full mb-4">
              <ReactPlayer
                url={videoData.videoUrl} // Assuming `videoUrl` is the direct link to the video file
                controls={true}
                width="100%"
                height="100%"
                className="rounded-lg overflow-hidden"
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
                <p className="text-gray-600">Uploaded by {videoData.uploader}</p>
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
    </div>
  );
};

export default VideoDetail;
