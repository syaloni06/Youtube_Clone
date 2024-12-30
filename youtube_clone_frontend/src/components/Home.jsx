import { useEffect, useState } from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const token = user?.token;
      try {
        console.log(token, "syaloni");
        if(token !== null ){
          const response = await axios.get("http://localhost:5100/videos", {
            headers: {
              Authorization: token, // Pass token in the Authorization header
            },
          });
          setVideos(response.data); // Assuming the API returns an array of videos
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  const handleVideoClick = (videoId) => {
    // Navigate to the video detail page when a video is clicked
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="min-h-screen">
      <main className="container ml-24 mt-5 py-6">
        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-500">Loading videos...</p>
        ) : videos.length > 0 ? (
          <div className="flex flex-wrap justify-evenly gap-3">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white overflow-hidden w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)]"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-56 rounded-xl cursor-pointer"
                  onClick={() => handleVideoClick(video.videoId)} // Handle click event to navigate
                />
                <div className="px-1 py-2">
                  <div className="flex">
                    <img
                      src={video.channelLogo}
                      alt={video.uploader}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="m-3">
                      <h3 className="font-bold text-lg line-clamp-2">
                        {video.title}
                      </h3>
                      <span className="truncate">{video.uploader}</span>
                      <div className="text-gray-500 text-sm mt-2">
                        {video.views.toLocaleString()} views •{" "}
                        {new Date(video.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No videos available.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
