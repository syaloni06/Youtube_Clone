/* eslint-disable react/prop-types */


import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const MenuBar = ({ toggleMenu, isMenuOpen, user }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex items-center">
      {user === null ? (
        <button
          onClick={() => navigate("/signin")}
          className="flex items-center border border-gray-300 rounded-full h-10 mr-7 self-center hover:bg-blue-100"
        >
          <div className="flex p-2 gap-1">
            <RiAccountCircleLine className="self-center text-blue-600 text-3xl" />
            <div className="text-blue-600 self-center font-semibold text-lg">
              Sign in
            </div>
          </div>
        </button>
      ) : (
        <>
          <button
            className="flex items-center text-black px-3 py-2 rounded-lg"
            onClick={toggleMenu}
          >
            <img
              className="rounded-full w-9 h-9"
              src={user.avatar}
              alt="User Avatar"
            />
          </button>

          {isMenuOpen && (
            <div
              id="menu-overlay"
              className="absolute right-12 top-10 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-lg z-50"
            >
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold">{user?.name || "Guest"}</p>
                <p className="text-sm text-gray-500">
                  {user?.username || "User ID"}
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Google Account
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Switch account
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Sign out
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  YouTube Studio
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Purchases and memberships
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MenuBar;
