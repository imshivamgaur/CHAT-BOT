import { useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setChatMessages(""); // Clear previous conversation

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/chats",
        data: { message: userMessage },
        responseType: "stream", // Attempt to handle streaming
      });

      const chunks = response.data.split("\n");
      chunks.forEach((chunk: string) => {
        console.log(chunk);
        if (chunk) setChatMessages((prev) => prev + chunk);
      });
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setChatMessages("Failed to fetch response!"); // Error message
    }

    setUserMessage(""); // Clear the input field after sending the message
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Chat Page</h2>
      <div className="w-full max-w-lg p-4 bg-gray-800 shadow-md rounded-lg">
        <div className="h-64 border border-gray-700 p-2 overflow-y-auto bg-gray-700">
          <pre className="whitespace-pre-line">
            {chatMessages || "Start chatting by typing below!"}
          </pre>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex">
          <input
            type="text"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="flex-grow border border-gray-700 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
