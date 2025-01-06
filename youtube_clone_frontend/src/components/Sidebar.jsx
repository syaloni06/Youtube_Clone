import { MdHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get the current route location
  return (
    <>
     {/* Conditionally render the sidebar based on the current pathname */}
      {(location.pathname === "/" || location.pathname.startsWith("/channel/")) && (
        <div className="fixed bottom-0 lg:top-16 lg:left-0 lg:h-screen flex lg:flex-col w-full lg:w-20 bg-white lg:items-center z-50 lg:z-0">
          {/* Sidebar Items Container */}
          <div className="flex flex-row lg:flex-col justify-around lg:justify-start w-full lg:w-auto">
            {/* Home */}
            <div className="flex flex-1 flex-col items-center py-2 lg:py-5 px-5 lg:rounded-xl hover:bg-gray-100">
              <MdHome className="text-3xl text-black" />{/* Icon for Home */}
              <span className="text-xs text-gray-700 mt-1">Home</span>{/* Label for Home */}
            </div>
            {/* Shorts */}
            <div className="flex flex-1 flex-col items-center self-center py-2 lg:py-5 px-5 lg:rounded-xl hover:bg-gray-100">
              <SiYoutubeshorts className="text-2xl text-white stroke-black stroke-2" />{/* Icon for Shorts */}
              <span className="text-xs text-gray-700 mt-1">Shorts</span>{/* Label for Shorts */}
            </div>
            {/* Subscriptions */}
            <div className="flex flex-1 flex-col items-center px-5 lg:px-0 py-2 lg:py-5 lg:rounded-xl hover:bg-gray-100">
              <MdOutlineSubscriptions className="text-3xl text-black" />{/* Icon for Subscriptions */}
              <span className="text-xs text-gray-700 mt-1">Subscriptions</span>{/* Label for Subscriptions */}
            </div>
            {/* You */}
            <div className="flex flex-1 flex-col items-center py-2 lg:py-5 px-5 lg:rounded-xl hover:bg-gray-100">
              <RiAccountCircleLine className="text-3xl text-black" />{/* Icon for You (Account) */}
              <span className="text-xs text-gray-700 mt-1">You</span>{/* Label for You */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
