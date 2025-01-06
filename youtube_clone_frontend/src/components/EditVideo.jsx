/* eslint-disable react/prop-types */

import { useState } from "react";

const EditVideo = ({
  showEditDialog,
  editVideo,
  setEditVideo,
  setShowEditDialog,
  handleSaveEdit,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!editVideo.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!editVideo.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!editVideo.thumbnailUrl.trim()) {
      newErrors.thumbnailUrl = "Thumbnail URL is required.";
    }
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      handleSaveEdit();
    }
  };

  return (
    <>
      {showEditDialog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl m-4 md:m-0 w-full md:w-3/5 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 text-lg hover:text-gray-800"
              onClick={() => setShowEditDialog(false)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Edit Video
            </h2>
            <form>
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
                  value={editVideo.title}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, title: e.target.value })
                  }
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:outline-none ${
                    errors.title ? "focus:ring-red-400" : "focus:ring-blue-400"
                  }`}
                  placeholder="Enter video title"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-2">{errors.title}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={editVideo.description}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, description: e.target.value })
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
                {errors.description && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.description}
                  </p>
                )}
              </div>
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
                  value={editVideo.thumbnailUrl}
                  onChange={(e) =>
                    setEditVideo({
                      ...editVideo,
                      thumbnailUrl: e.target.value,
                    })
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
                {errors.thumbnailUrl && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.thumbnailUrl}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition"
                  onClick={handleSave}
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
