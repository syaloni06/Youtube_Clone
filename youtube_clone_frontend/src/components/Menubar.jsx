/* eslint-disable react/prop-types */
import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { SiYoutubestudio } from "react-icons/si";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiShieldUserLine } from "react-icons/ri";
import { BsMoon } from "react-icons/bs";
import { IoLanguageOutline } from "react-icons/io5";
import { TbUserShield } from "react-icons/tb";
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
              className="absolute right-0 top-12 max-h-[90vh] mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-50"
            >
              <div className="flex gap-4 p-4 border-b border-gray-200">
                <img
                  className="rounded-full w-11 h-11"
                  src={user.avatar}
                  alt="User Avatar"
                />
                <div>
                  <p className="font-medium text-lg">{user?.username}</p>
                  <p className=" font-medium text-base">
                    @{user?.username || "User ID"}
                  </p>
                  <a
                    href="/your-channel"
                    className="text-blue-500 font-medium text-sm"
                  >
                    View your channel
                  </a>
                </div>
              </div>
              <div className="mt-2 max-h-[70vh] scrollbar-hide overflow-y-auto">
                <ul className="">
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <FaGoogle className="self-center text-2xl" />
                    Google Account
                  </li>
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <MdOutlineSwitchAccount className="self-center text-2xl" />
                    Switch account
                    <IoIosArrowForward className="self-center justify-items-end text-xl" />
                  </li>
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <CiLogin className="self-center text-2xl" />
                    Sign out
                  </li>
                  <hr className="border-b mt-2 border-gray-200" />
                  <li className="flex gap-4 px-4 py-3 mt-2 text-base hover:bg-gray-100 cursor-pointer">
                    <SiYoutubestudio className="self-center text-2xl" />
                    YouTube Studio
                  </li>
                  <li className="flex gap-4 px-3 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <RiMoneyDollarCircleLine className="self-center text-3xl" />
                    Purchases and memberships
                  </li>
                  <hr className="border-b mt-2 border-gray-200" />
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <RiShieldUserLine className="self-center text-2xl" />
                    Your data in YouTube
                  </li>
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <BsMoon className="self-center text-2xl" />
                    Appearance: Light
                  </li>
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <IoLanguageOutline className="self-center text-2xl" />
                    Language: British English
                  </li>
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <TbUserShield className="self-center text-2xl" />
                    Restricted Mode: Off
                  </li>
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <FaGoogle className="self-center text-2xl" />
                    Location: India
                  </li>
                  <li className="flex gap-4 px-4 py-3 text-base hover:bg-gray-100 cursor-pointer">
                    <FaGoogle className="self-center text-2xl" />
                    Keyboard shortcuts
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MenuBar;
