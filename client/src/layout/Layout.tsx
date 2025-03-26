import { Link, Outlet } from "react-router-dom";
import { RiRobot2Line } from "react-icons/ri";

const Layout = () => {
  return (
    <div className="w-ful h-full flex flex-col text-gray-300">
      <nav className=" flex items-center justify-between bg-[#0000004e] py-4 px-10">
        <div className="text-2xl">
          <Link to={"/"} className="flex items-center gap-2">
            <RiRobot2Line className="text-cyan-400 hover:text-cyan-100  transition-all duration-300 text-3xl" />
            <span className="font-semibold hover:text-gray-100 transition-all duration-300">
              BOT4U
            </span>
          </Link>
        </div>
        <div className="text-2xl">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              className="border-2 hover:text-gray-100 w-10 h-10 rounded-full  transition-all duration-300"
              src="hell"
              alt=""
            />
          </Link>
        </div>
      </nav>

      <main className="h-full flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
