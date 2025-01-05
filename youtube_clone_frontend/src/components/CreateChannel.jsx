/* eslint-disable no-unused-vars */
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
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Real-time Validation
    validateField(id, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    switch (name) {
      case "channelName":
        fieldErrors.channelName = value ? "" : "Channel name is required.";
        break;
      case "handle":
        fieldErrors.handle = value.length >= 3 ? "" : "Handle must be at least 3 characters.";
        break;
      case "description":
        fieldErrors.description = value ? "" : "Description is required.";
        break;
      case "channelBanner":
        fieldErrors.channelBanner = value ? "" : "Banner URL is required.";
        break;
      case "channelLogo":
        fieldErrors.channelLogo = value ? "" : "Logo URL is required.";
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  const validateForm = () => {
    const fieldErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) fieldErrors[key] = `${key} is required.`;
    });
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const token = user?.token;
      const headers = {
        Authorization: token,
      };

      // Send POST request to create the channel
      const response = await axios.post(
        "http://localhost:5100/channels",
        formData,
        { headers }
      );

      // Send PUT request to update the user with the channel ID
      const updateUserResponse = await axios.put(
        `http://localhost:5100/update/${user.userId}`,
        { channelId: response.data.channel.channelId },
        { headers }
      );

      // Update Redux state and handle success
      dispatch(updateUserInfo({ channelId: response.data.channel.channelId }));
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
          <div className="bg-white rounded-lg w-1/2 p-6 shadow-lg">
            <h2 className="text-lg font-medium mb-6 text-center text-gray-700">Create Channel</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="channelName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Channel Name
                </label>
                <input
                  type="text"
                  id="channelName"
                  className={`w-full border px-3 py-2 rounded-lg ${
                    errors.channelName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter channel name"
                  value={formData.channelName}
                  onChange={handleInputChange}
                  required
                />
                {errors.channelName && (
                  <p className="text-sm text-red-500 mt-1">{errors.channelName}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="handle"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Handle
                </label>
                <input
                  type="text"
                  id="handle"
                  className={`w-full border px-3 py-2 rounded-lg ${
                    errors.handle ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="@handle123"
                  value={formData.handle}
                  onChange={handleInputChange}
                  required
                />
                {errors.handle && (
                  <p className="text-sm text-red-500 mt-1">{errors.handle}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className={`w-full border px-3 py-2 rounded-lg ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter channel description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="channelBanner"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Banner Image URL
                </label>
                <input
                  type="text"
                  id="channelBanner"
                  className={`w-full border px-3 py-2 rounded-lg ${
                    errors.channelBanner ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter banner image URL"
                  value={formData.channelBanner}
                  onChange={handleInputChange}
                  required
                />
                {errors.channelBanner && (
                  <p className="text-sm text-red-500 mt-1">{errors.channelBanner}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="channelLogo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Logo Image URL
                </label>
                <input
                  type="text"
                  id="channelLogo"
                  className={`w-full border px-3 py-2 rounded-lg ${
                    errors.channelLogo ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter logo image URL"
                  value={formData.channelLogo}
                  onChange={handleInputChange}
                  required
                />
                {errors.channelLogo && (
                  <p className="text-sm text-red-500 mt-1">{errors.channelLogo}</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsCreateChannelOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
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
