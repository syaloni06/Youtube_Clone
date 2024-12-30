import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5100/videos");
        setVideos(response.data); // Assuming the API returns an array of videos
      } catch (err) {
        console.error(err);
        setError("Failed to fetch videos. Please try again later.");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="container ml-24 mt-5 py-6">
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-wrap justify-evenly gap-3">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white overflow-hidden w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)]"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-56 rounded-xl"
              />
              <div className="p-4">
                <div className="flex">
                  <img
                    src={video.channelLogo}
                    alt={video.uploader}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm ">
                      <h3 className="font-bold text-lg line-clamp-1">
                        {video.title}
                      </h3>
                    </div>
                    <span className="truncate">{video.uploader}</span>
                    <div className="text-gray-500 text-sm mt-2">
                      {video.views.toLocaleString()} views •{" "}
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          ;
        </div>
      </main>
    </div>
  );
};

export default Home;
