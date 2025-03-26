import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import Layout from "./layout/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

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
        children: [
          {
            path: "chats/:d",
            element: <ChatPage />,
          },
        ],
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <>
      <div className="bg-[#080808] absolute top-0 z-[-10] h-screen bg-[radial-gradient(ellipse_80%_100%_at_30%_-20%,rgba(128,0,128,0.3),rgba(255,255,255,0))]  text-gray-100 w-full  "></div>
      <div className="w-full h-screen flex flex-col ">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
