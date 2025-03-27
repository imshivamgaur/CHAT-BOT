import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  console.log(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId]);

  if (!isLoaded)
    return (
      <div className="w-full h-full flex justify-center items-center text-2xl text-blue-200">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-full border-t-1 border-[#ffffff2b] flex  ">
      {/* left */}
      <div className="w-[300px] hidden md:block bg-[#0000004e] border-r-1 border-[#ffffff2b] p-5">
        <ul className="flex flex-col gap-5 list-none ">
          <li className="border-1 p-2 rounded-[5px]">lorem123</li>
        </ul>
      </div>

      {/* right */}
      <div className="w-[cal(100%-300px)] p-5 flex-grow ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
