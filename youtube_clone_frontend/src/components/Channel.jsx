import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

const Channel = () => {
  const channelId = useParams();
  const user = useSelector((state) => state.user.data);
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelData, setChannelData] = useState(null); // State to store channel data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/videos/channel/${channelId.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setChannelVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    const fetchChannel = async () => {
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/channels/${channelId.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setChannelData(response.data);
      } catch (err) {
        console.error("Error fetching channel data:", err);
      }
    };

    if (user?.token && channelId.id) {
      fetchVideo();
      fetchChannel();
    }
  }, [user?.token, channelId]);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <>
      {/* Channel Header */}
      <div className="channel-header ml-36 mt-16 mr-20 mb-3 overflow-hidden">
        {channelData ? (
          <div>
            {/* Banner */}
            <img
              className="channel-banner h-46 rounded-2xl w-full"
              src={channelData.channelBanner}
              alt="Channel Banner"
            />
            {/* Channel Info */}
            <div className="flex items-start mt-4 gap-4 p-4">
              <img
                src={channelData.channelLogo}
                alt={channelData.channelName}
                className="w-44 h-44 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="flex  gap-2 text-4xl font-bold">
                  {channelData.channelName}
                  <FaCheckCircle className="text-sm self-center" />
                </h2>
                <div className="flex font-medium mt-3 text-gray-500">
                  <span className="text-black">@{user.username}</span>
                  <LuDot className="self-center" />
                  <span>{channelData.subscribers} subscribers</span>
                  <LuDot className="self-center" />
                  <span>{channelVideos.length} videos</span>
                </div>
                <p className="mt-2 text-gray-700">{channelData.description}</p>
                <div className="flex gap-2 mt-3">
                  <button className="px-5 py-2 bg-black hover:bg-slate-800 text-white font-medium rounded-full shadow-sm transition">
                    <span>Subscribe</span>
                  </button>
                  <button className="gap-2 px-4 py-2 border border-gray-200  hover:bg-gray-100 text-black font-medium rounded-full">
                    <span>Join</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading channel information...</p>
        )}
      </div>
      {/* Navigation Bar */}
      <div className="channel-navigation flex justify-start ml-36 mt-3 mb-6 text-gray-600 text-lg font-medium border-b-2 border-gray-200 mr-16">
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Home
        </button>
        <button className="px-2 mx-2 pb-2 text-black border-b-2 border-black">
          Videos
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Shorts
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Courses
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Playlists
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Community
        </button>
        <button className="px-4 pb-2">
          <CiSearch className="text-3xl" />
        </button>
      </div>
      {/* Channel Videos */}
      <div className="flex flex-wrap ml-36 mr-16 justify-evenly gap-y-10">
        {channelVideos?.map((video) => (
          <div
            key={video._id}
            className="bg-white overflow-hidden w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)] cursor-pointer"
            onClick={() => handleVideoClick(video.videoId)}
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
