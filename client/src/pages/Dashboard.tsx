import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-full h-full border-t-1 border-[#ffffff2b] flex  ">
      {/* left */}
      <div className="w-[300px] bg-[#0000004e] border-r-1 border-[#ffffff2b] p-5">
        <ul className="flex flex-col gap-5 list-none ">
          <li className="border-1 p-2 rounded-[5px]">lorem123</li>
          <li className="border-1 p-2 rounded-[5px]">lorem123</li>
          <li className="border-1 p-2 rounded-[5px]">lorem123</li>
          <li className="border-1 p-2 rounded-[5px]">lorem123</li>
          <li className="border-1 p-2 rounded-[5px]">lorem123</li>
        </ul>
      </div>
      {/* right */}
      <div className="w-[cal(100%-300px)] p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
