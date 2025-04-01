import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createChat, fetchChatsTitle } from "../api/chatApi"; // Import API function

const DashboardLayout = () => {
  const { userId, isLoaded, getToken } = useAuth();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  // Adding new chat
  const addNewchat = useCallback(async () => {
    if (!userId) return;

    try {
      const token = await getToken();
      const newChat = await createChat(userId, token);

      if (newChat) {
        setChats((prevChats) => [newChat, ...prevChats]); // Update chat list
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  }, [userId, getToken, navigate]);

  const getChats = useCallback(async () => {
    if (!userId) return;

    try {
      const token = await getToken(); // Fetch the token
      const data = await fetchChatsTitle(userId, token);
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, [userId]);
  
  useEffect(() => {
    if (!userId) return;

    getChats();
  }, [getChats]); // Only runs when getChats changes

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded)
    return (
      <div className="w-full h-full flex justify-center items-center text-2xl text-blue-200">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-full border-t-1 border-[#ffffff2b] flex">
      {/* Left Sidebar */}
      <div className="w-[300px] hidden md:block bg-[#0000004e] border-r-1 border-[#ffffff2b] p-5 overflow-y-auto">
        <button
          onClick={addNewchat}
          className="bg-blue-700 hover:bg-blue-600 transition-all duration-300 py-3 cursor-pointer w-full font-bold rounded-md mb-4"
        >
          Create new chat
        </button>
        <ul className="flex flex-col gap-3 list-none">
          <div className="font-semibold text-gray-200">RECENT CHATS</div>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat._id}
                className=" p-2 border-1 border-[#ffffff2b] hover:border-[#ffffff90] transition-all  duration-300 rounded-[5px] cursor-pointer truncate"
                onClick={() => navigate(`chats/${chat._id}`)}
              >
                {chat.title}
              </li>
            ))
          ) : (
            <li className="text-xl text-center text-gray-400">
              No chats found
            </li>
          )}
        </ul>
      </div>

      {/* Right Content */}
      <div className="w-[calc(100%-300px)] p-5 flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
