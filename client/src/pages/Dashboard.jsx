import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { addNewchat } = useOutletContext(); //It compes from right outlet in dashboard layout
  return (
    <div className="h-full bg-[#0000005a] text-white flex flex-col items-center justify-center p-5">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          BOT4U AI
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Create a Chat */}
        <div
          onClick={() => addNewchat()}
          className="flex flex-col items-center justify-center w-64 h-40 border border-gray-700 rounded-xl hover:bg-gray-800 transition"
        >
          <span className="text-4xl">💬</span>
          <p className="mt-3 text-lg">Start a Chat</p>
        </div>

        <div
          onClick={() => addNewchat()}
          className="flex flex-col items-center justify-center w-64 h-40 border border-gray-700 rounded-xl hover:bg-gray-800 transition"
        >
          <span className="text-4xl">👨‍💻</span>
          <p className="mt-3 text-lg">Help with Code</p>
        </div>

        <div
          onClick={() => addNewchat()}
          className="flex flex-col items-center justify-center w-64 h-40 border border-gray-700 rounded-xl hover:bg-gray-800 transition"
        >
          <span className="text-4xl">🤖</span>
          <p className="mt-3 text-lg">AI Assistance</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
