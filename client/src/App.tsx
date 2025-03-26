import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import Layout from "./layout/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/chats/:id",
        element: <ChatPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <div className="bg-[#0f0f0f] text-gray-100 w-full h-screen ">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
