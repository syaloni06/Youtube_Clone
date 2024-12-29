import { MdHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
    {location.pathname === "/" && (
    <div className="fixed left-0 top-16 flex flex-col items-center bg-white w-20">
      {/* Home */}
      <div className="flex flex-col items-center py-5 px-5 rounded-xl hover:bg-gray-100 ">
        <MdHome className="text-3xl text-black" />
        <span className="text-xs text-gray-700 mt-1">Home</span>
      </div>
      {/* Shorts */}
      <div className="flex flex-col items-center py-5 px-5 rounded-xl hover:bg-gray-100">
        <SiYoutubeshorts className="text-2xl text-white stroke-black stroke-2" />
        <span className="text-xs text-gray-700 mt-1">Shorts</span>
      </div>
      {/* Subscriptions */}
      <div className="flex flex-col items-center py-5 rounded-xl hover:bg-gray-100">
        <MdOutlineSubscriptions className="text-3xl text-black" />
        <span className="text-xs text-gray-700 mt-1">Subscriptions</span>
      </div>
      {/* You */}
      <div className="flex flex-col items-center py-5 px-5 rounded-xl hover:bg-gray-100">
        <RiAccountCircleLine className="text-3xl text-black" />
        <span className="text-xs text-gray-700 mt-1">You</span>
      </div>
    </div>
    )};
    </>
  );
};

export default Sidebar;
