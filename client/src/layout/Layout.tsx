import { Link, Outlet } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="rootLayout">
      <nav className=" flex items-center justify-between bg-[#090909] text-gray-400  transition-all duration-300 py-4 px-10">
        <div className="text-2xl">
          <Link to={"/"} className="flex items-center gap-2">
            <FaRobot className="text-cyan-400 text-3xl" />
            <span className="font-bold hover:text-gray-100">SHIV AI</span>
          </Link>
        </div>

        <div className="text-2xl">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              className="border-2 hover:text-gray-100 w-10 h-10 rounded-full"
              src="hell"
              alt=""
            />
          </Link>
        </div>
      </nav>

      <main className="px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
