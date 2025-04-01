import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout.tsx";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chats/:chatId",
            element: <ChatPage />,
          },
        ],
        errorElement: <ErrorPage />,
      },
      {
        path: "/sign-in/",
        element: <SignIn />,
      },
      {
        path: "/sign-up/",
        element: <SignUp />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <>
      {/* <div className="bg-[#080808] absolute top-0 z-[-10] h-screen bg-[radial-gradient(ellipse_80%_100%_at_30%_-20%,rgba(128,0,128,0.3),rgba(255,255,255,0))]  text-gray-100 w-full  "></div> */}

      <div className="fixed bg-[#00000077] z-[-100] w-full h-full top-0 left-0 bottom-0 "></div>
      <div className="fixed bg-[#040114] top-0 left-0 z-[-260] w-full h-full object-cover"></div>
      <div className="fixed z-[-200] flex flex-col h-full w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="rotate-180 fixed top-[-42%] left-0 z-[-200] w-full h-full object-cover"
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
      </div>

      <div className="w-full absolute z-50 h-screen flex flex-col ">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
