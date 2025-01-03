// eslint-disable-next-line react/prop-types
const CreateChannel = ( {isCreateChannelOpen, setIsCreateChannelOpen}) => {
  return (
    <>
      {/* Dialog for Creating a Channel */}
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
                  placeholder="Enter your channel name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="channelHandle"
                  className="block text-sm font-medium mb-1"
                >
                  Handle
                </label>
                <input
                  type="text"
                  id="channelHandle"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="@yourhandle"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="channelImage"
                  className="block text-sm font-medium mb-1"
                >
                  Profile Picture
                </label>
                <input
                  type="text"
                  id="channelImage"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="imageurl"
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
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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
