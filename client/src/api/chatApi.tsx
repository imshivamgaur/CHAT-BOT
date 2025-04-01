import axios from "axios";

// For sidebar chatTitle
export const fetchChatsTitle = async (userId: any, token: any) => {
  try {
    const response = await axios.get(
      "https://bot4u-ai.onrender.com/api/v1/chats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "clerk-user-id": userId, // Send userId in headers
        },
      }
    );

    return response.data.chats; // Ensure you return only the chat list
  } catch (error) {
    console.error("Error fetching chats:", error);
    return []; // Return empty array on failure
  }
};

// For creating a new chat
export const createChat = async (userId: any, token: any) => {
  try {
    const response = await axios.post(
      "https://bot4u-ai.onrender.com/api/v1/chats",
      { prompt: "" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "clerk-user-id": userId, // Send userId in headers
        },
      }
    );

    return response.data.chat;
  } catch (error) {
    console.log("Error creating chat: ", error);
    return null;
  }
};
