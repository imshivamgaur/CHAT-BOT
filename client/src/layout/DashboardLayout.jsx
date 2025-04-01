import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { createChat, fetchChatsTitle } from "../api/chatApi"; // Import API function
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const DashboardLayout = () => {
  const { userId, isLoaded, getToken } = useAuth();
  const [chats, setChats] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { chatId } = useParams();

  // Adding new chat
  const addNewchat = useCallback(async () => {
    if (!userId) return;

    try {
      const token = await getToken();
      const newChat = await createChat(userId, token);

      if (newChat) {
        setChats((prevChats) => [newChat, ...prevChats]); // Update chat list
      }
      console.log("New chat is created", newChat);
      navigate(`/dashboard/chats/${newChat._id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  }, [userId, getToken, navigate]);

  // get chats with title
  const getChats = useCallback(async () => {
    if (!userId) return;

    try {
      const token = await getToken(); // Fetch the token
      const data = await fetchChatsTitle(userId, token);
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error.message);
    }
  }, [userId]);

  // Delete chat with ChatId
  const deleteUserChat = async (id) => {
    console.log("Deleted chat Id:", id);
    const token = await getToken();
    if (!userId && !token) return;
    try {
      const response = await axios.delete(
        `https://bot4u-ai.onrender.com/api/v1/chats/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "clerk-user-id": userId, // Send userId in headers
          },
        }
      );

      console.log(response.data);
      navigate("/dashboard");
      getChats();
    } catch (error) {
      console.log("Error to delete", error.message);
    }
  };

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
      {/* Hamburger */}
      <button
        className="fixed z-[10000000] top-18 right-0 bg-[#0f0f0fb1] cursor-pointer text-white p-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdClose size={34} /> : <MdMenu size={34} />}
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed top-18 md:top-0 z-[1000000] left-0 w-[300px] h-full bg-[#0000004e] border-r-1 border-[#ffffff2b] p-5 overflow-y-auto 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform h-full  duration-300 md:relative backdrop-blur-2xl md:translate-x-0 md:block`}
      >
        <button
          onClick={addNewchat}
          className="bg-blue-700 hover:bg-blue-600 transition-all duration-300 py-3 cursor-pointer w-full font-bold rounded-md mb-4"
        >
          Create new chat
        </button>
        <ul className="flex flex-col gap-3 list-none">
          <div className="font-semibold text-gray-200">RECENT CHATS</div>
          {chats.length > 0 ? (
            chats.map((chat) => {
              const isActive = chat._id === chatId; // Check if chat is active

              return (
                <li
                  key={chat._id}
                  className={`p-2 border-2 ${
                    isActive
                      ? "border-green-400 hover:border-green-500"
                      : "border-[#ffffff2b] hover:border-[#ffffff90]"
                  }   transition-all  duration-300 rounded-[5px] truncate`}
                  onClick={() => {
                    navigate(`chats/${chat._id}`);
                    setIsOpen(false);
                  }}
                >
                  {chat.title === "New Chat" ? (
                    <div className="flex justify-between">
                      <div className="w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {chat.title}
                      </div>
                      <button
                        onClick={() => deleteUserChat(chat._id)}
                        className="text-red-300 hover:text-red-400 transition-all duration-300 cursor-pointer"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div className="w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {chat.title}
                      </div>
                      <button
                        onClick={() => deleteUserChat(chat._id)}
                        className="text-red-300 hover:text-red-400 transition-all duration-300 cursor-pointer"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  )}
                </li>
              );
            })
          ) : (
            <li className="text-xl text-center text-gray-400">
              No chats found
            </li>
          )}
        </ul>
      </div>

      {/* Right Content */}
      <div
        onClick={() => setIsOpen(false)}
        className="w-[calc(100%-300px)]  flex-grow"
      >
        <Outlet context={{ getChats, addNewchat }} />
      </div>
    </div>
  );
};

export default DashboardLayout;
