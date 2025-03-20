/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../utils/userSlice";
import Swal from "sweetalert2";
import { API_URL } from "../utils/API_URL";

// CreateChannel component for creating a new channel
const CreateChannel = ({ isCreateChannelOpen, setIsCreateChannelOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  // Initial form state
  const [formData, setFormData] = useState({
    channelName: "",
    owner: user.userId, // Setting owner to the current logged-in user's ID
    handle: "",
    description: "",
    channelBanner: "",
    channelLogo: "",
  });
  const [errors, setErrors] = useState({});

  // Function to handle input changes and validate the field in real-time
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Real-time validation for individual fields
    validateField(id, value);
  };

  // Validate individual fields and set error messages
  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    switch (name) {
      case "channelName":
        fieldErrors.channelName = value ? "" : "Channel name is required.";
        break;
      case "handle":
        fieldErrors.handle =
          value.length >= 3 ? "" : "Handle must be at least 3 characters.";
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

  // Validate the entire form before submission
  const validateForm = () => {
    const fieldErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) fieldErrors[key] = `${key} is required.`; // Mark fields as required
    });
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0; // Form is valid if there are no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If form is not valid, stop submission
    if (!validateForm()) return;

    // Show a SweetAlert loading spinner
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we create the channel.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const token = user?.token; // Get user token
      const headers = {
        Authorization: token, // Set Authorization header
      };

      // Send POST request to create a new channel
      const response = await axios.post(
        `${API_URL}/channels`,
        formData,
        { headers }
      );

      // Send PUT request to update the user with the channel ID
      const updateUserResponse = await axios.put(
        `${API_URL}/update/${user.userId}`,
        { channelId: response.data.channel.channelId },
        { headers }
      );

      // Update Redux state with the new channel ID
      dispatch(updateUserInfo({ channelId: response.data.channel.channelId }));

      // Close the SweetAlert loading spinner and show success
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Channel created successfully!",
      });

      // Close the modal
      setIsCreateChannelOpen(false);
    } catch (error) {
      console.error("Error creating channel:", error);

      // Close the SweetAlert loading spinner and show error
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to create channel. Please try again.",
      });
    }
  };

  return (
    <>
      {isCreateChannelOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[95vw] md:w-[80vw] lg:w-1/2 p-6 shadow-lg relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 text-lg hover:text-gray-800"
              onClick={() => setIsCreateChannelOpen(false)}
            >
              &times;
            </button>
            {/* Modal Header */}
            <h2 className="text-lg font-medium mb-6 text-center text-gray-700">
              Create Channel
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Input for channel name */}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.channelName}
                  </p>
                )}
              </div>
              {/* Input for handle */}
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
              {/* Input for description */}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              {/* Input for banner URL */}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.channelBanner}
                  </p>
                )}
              </div>
              {/* Input for logo URL */}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.channelLogo}
                  </p>
                )}
              </div>
              {/* Action buttons */}
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
