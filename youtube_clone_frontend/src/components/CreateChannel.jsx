/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../utils/userSlice";

const CreateChannel = ({ isCreateChannelOpen, setIsCreateChannelOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [formData, setFormData] = useState({
    channelName: "",
    owner: user.userId,
    handle: "",
    description: "",
    channelBanner: "",
    channelLogo: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5100/channels", formData);
      const updateUserResponse = await axios.put(`http://localhost:5100/update/${user.userId}`, {channelId: response.data.channel.channelId});
      dispatch(updateUserInfo({ channelId: response.data.channel.channelId }))
      console.log("Channel created successfully:", response.data, updateUserResponse.data);
      alert("Channel created successfully!");
      setIsCreateChannelOpen(false);
    } catch (error) {
      console.error("Error creating channel:", error);
      alert("Failed to create channel. Please try again.");
    }
  };

  return (
    <>
      {isCreateChannelOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6">
            <h2 className="text-lg font-medium mb-4">Create Channel</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="channelName"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="channelName"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter channel name"
                  value={formData.channelName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="handle"
                  className="block text-sm font-medium mb-1"
                >
                  Handle
                </label>
                <input
                  type="text"
                  id="handle"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="@handle123"
                  value={formData.handle}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter channel description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="channelBanner"
                  className="block text-sm font-medium mb-1"
                >
                  Banner Image URL
                </label>
                <input
                  type="text"
                  id="channelBanner"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter banner image URL"
                  value={formData.channelBanner}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="channelLogo"
                  className="block text-sm font-medium mb-1"
                >
                  Logo Image URL
                </label>
                <input
                  type="text"
                  id="channelLogo"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter logo image URL"
                  value={formData.channelLogo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700"
                  onClick={() => setIsCreateChannelOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={handleSubmit}
                >
                  Create Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateChannel;
