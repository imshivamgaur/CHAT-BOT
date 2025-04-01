import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Get chatId from URL
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import MarkDown from "react-markdown";

const ChatPage = () => {
  const { chatId } = useParams(); // Get chatId from URL
  const { userId, getToken } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("Chat ID: ", chatId);

  // Fetch messages when component loads
  useEffect(() => {
    if (!chatId || !userId) return;

    const fetchMessages = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `http://localhost:5000/api/v1/chats/${chatId}`,
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
        `http://localhost:5000/api/v1/chats/${chatId}`,
        { prompt: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "clerk-user-id": userId, // Send userId in headers
          },
        }
      );

      console.log("CHAT RESPONSE: ", response.data);

      // Update messages with AI response
      setMessages(response.data.chat.messages);
    } catch (error) {
      console.log("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Chat messages */}
      <div className="flex flex-col flex-grow overflow-y-auto p-4 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-[70%] rounded-lg text-white break-words ${
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
            className={`p-3 max-w-[70%] rounded-lg text-white  bg-gray-900 self-start`}
          >
            Hey, there how can i assist you today?
          </div>
        )}

        {loading ? <div className="loader bg-blue-500"></div> : ""}
      </div>

      {/* Input box */}
      <div className="flex items-center p-4 bg-[#3030307a] rounded-xl">
        <input
          type="text"
          className="flex-grow p-3 bg-gray-900 text-white border border-gray-600 rounded-md outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 w-[130px] py-3 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
