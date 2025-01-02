import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
const Channel = () => {
  const channelId = useParams();
  const user = useSelector((state) => state.user.data);
  const [channelVideos, setChannelVideos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVideo = async () => {
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/videos/channel/${channelId.id}`,
          {
            headers: {
              Authorization: token, // Pass token in the Authorization header
            },
          }
        );
        setChannelVideos(response.data); // Assuming the API returns a single video object
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideo();
  }, [user?.token, channelId]);
  const handleVideoClick = (videoId) => {
    // Navigate to the video detail page when a video is clicked
    navigate(`/video/${videoId}`);
  };
  return (
    <>
      <div className="flex flex-wrap justify-evenly gap-y-10">
        {channelVideos?.map((video) => (
          <div
            key={video._id}
            className="bg-white overflow-hidden w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)] cursor-pointer"
            onClick={() => handleVideoClick(video.videoId)} // Handle click event to navigate
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-56 rounded-xl cursor-pointer"
            />
            <div className="px-1 py-2">
              <div className="flex gap-4">
                <img
                  src={video.channelLogo}
                  alt={video.uploader}
                  className="w-10 h-10 my-1 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {video.title}
                  </h3>
                  <span className="truncate text-gray-500">
                    {video.uploader}
                  </span>
                  <div className="text-gray-600 text-sm">
                    {video.views.toLocaleString()} views •{" "}
                    {new Date(video.uploadDate).getDay()} days ago
                  </div>
                </div>
                <BsThreeDotsVertical className="ml-auto text-xl my-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Channel;
