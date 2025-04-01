import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom"; // Get chatId from URL
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import MarkDown from "react-markdown";

const ChatPage = () => {
  const { chatId } = useParams(); // Get chatId from URL
  const { userId, getToken } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageloading, setMessageloading] = useState(false);
  const { getChats } = useOutletContext(); //It compes from right outlet in dashboard layout

  // console.log("Chat ID: ", getChats);

  // Fetch messages when component loads
  useEffect(() => {
    if (!chatId || !userId) return;
    setMessageloading(true);

    const fetchMessages = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `https://bot4u-ai.onrender.com/api/v1/chats/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "clerk-user-id": userId, // Send userId in headers
            },
          }
        );
        console.log("data: ", response);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setMessageloading(false);
      }
    };

    fetchMessages();
  }, [chatId]); // Runs when chatId changes

  // Function to send a new message
  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!userId) return;

    const newMessage = { sender: "user", text: message };
    setMessages([...messages, newMessage]);
    setMessage("");
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.put(
        `https://bot4u-ai.onrender.com/api/v1/chats/${chatId}`,
        { prompt: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "clerk-user-id": userId, // Send userId in headers
          },
        }
      );

      if (!response) return;

      //If the messages = [] then only this function runs to set the title.
      if (messages.length === 0) {
        getChats();
      }

      console.log("CHAT RESPONSE: ", response.data);

      // Update messages with AI response
      setMessages(response.data.chat.messages);
    } catch (error) {
      console.log("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col p-5">
      {/* Chat messages */}
      <div className="flex flex-col flex-grow overflow-y-auto p-4 space-y-2">
        {messageloading ? (
          <div className="loader"></div>
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-[90%] sm:max-w-[80%] rounded-lg text-white break-words ${
                msg.sender === "user"
                  ? "bg-[#1276e88c] backdrop-blur-xl self-end"
                  : "bg-[#1c1c1c8c] backdrop-blur-xl self-start"
              }`}
            >
              <MarkDown>{msg.text}</MarkDown>
            </div>
          ))
        ) : (
          <div
            className={`p-3 max-w-[90%] sm:max-w-[70%]  rounded-lg text-white  bg-gray-900 self-start`}
          >
            Hey, there how can i assist you today?
          </div>
        )}

        {loading ? <div className="loader bg-blue-500"></div> : ""}
        {/* This is the reference for auto-scrolling */}
        <div ref={messageEndRef} />
      </div>

      {/* Input box */}
      <div className="flex items-center p-4 bg-[#3030307a] rounded-xl">
        <input
          type="text"
          className="flex-grow p-3 bg-[#30303000] text-white border-2 focus:border-blue-500 border-gray-600 rounded-md outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 w-[110px] Md:w-[130px] py-3 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
