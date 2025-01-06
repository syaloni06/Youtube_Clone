/* eslint-disable react/prop-types */

import { useState } from "react";

const EditVideo = ({
  showEditDialog, // Determines whether the edit video dialog is visible
  editVideo, // Current video details being edited
  setEditVideo, // Updates the video details being edited
  setShowEditDialog, // Toggles the visibility of the edit video dialog
  handleSaveEdit, // Callback function for saving the edited video details
}) => {
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Validates the form fields and returns an object with errors
  const validateForm = () => {
    const newErrors = {};
    if (!editVideo.title.trim()) {
      newErrors.title = "Title is required."; // Ensures title is not empty
    }
    if (!editVideo.description.trim()) {
      newErrors.description = "Description is required."; // Ensures description is not empty
    }
    if (!editVideo.thumbnailUrl.trim()) {
      newErrors.thumbnailUrl = "Thumbnail URL is required."; // Ensures thumbnail URL is not empty
    }
    return newErrors; // Returns the errors object
  };

  // Handles the save action by validating the form and invoking the save callback
  const handleSave = () => {
    const validationErrors = validateForm(); // Perform form validation
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Updates errors state if validation fails
    } else {
      setErrors({}); // Clears errors if validation passes
      handleSaveEdit(); // Calls the save function passed via props
    }
  };

  return (
    <>
      {showEditDialog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl m-4 md:m-0 w-full md:w-3/5 relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 text-lg hover:text-gray-800"
              onClick={() => setShowEditDialog(false)}
            >
              &times;
            </button>
            {/* Title */}
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Edit Video
            </h2>
            {/* Form */}
            <form>
              {/* Title Input */}
              <div className="mb-6">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={editVideo.title} // Controlled input for title
                  onChange={
                    (e) => setEditVideo({ ...editVideo, title: e.target.value }) // Updates the title state
                  }
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:outline-none ${
                    errors.title ? "focus:ring-red-400" : "focus:ring-blue-400"
                  }`}
                  placeholder="Enter video title"
                />
                {errors.title && ( // Displays error message if title validation fails
                  <p className="text-sm text-red-500 mt-2">{errors.title}</p>
                )}
              </div>
              {/* Description Input */}
              <div className="mb-6">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={editVideo.description} // Controlled input for description
                  onChange={
                    (e) =>
                      setEditVideo({
                        ...editVideo,
                        description: e.target.value,
                      }) // Updates the description state
                  }
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:outline-none ${
                    errors.description
                      ? "focus:ring-red-400"
                      : "focus:ring-blue-400"
                  }`}
                  rows="4"
                  placeholder="Enter video description"
                ></textarea>
                {errors.description && ( // Displays error message if description validation fails
                  <p className="text-sm text-red-500 mt-2">
                    {errors.description}
                  </p>
                )}
              </div>
              {/* Thumbnail URL Input */}
              <div className="mb-6">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="thumbnail"
                >
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  value={editVideo.thumbnailUrl} // Controlled input for thumbnail URL
                  onChange={
                    (e) =>
                      setEditVideo({
                        ...editVideo,
                        thumbnailUrl: e.target.value,
                      }) // Updates the thumbnail URL state
                  }
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm ${
                    errors.thumbnailUrl ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:outline-none ${
                    errors.thumbnailUrl
                      ? "focus:ring-red-400"
                      : "focus:ring-blue-400"
                  }`}
                  placeholder="Enter thumbnail URL"
                />
                {errors.thumbnailUrl && ( // Displays error message if thumbnail URL validation fails
                  <p className="text-sm text-red-500 mt-2">
                    {errors.thumbnailUrl}
                  </p>
                )}
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
                  onClick={() => setShowEditDialog(false)} // Cancels the edit and closes the dialog
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
                  onClick={handleSave} // Calls handleSave to validate and save the edits
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditVideo;
