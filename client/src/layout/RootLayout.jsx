import { Link, Outlet } from "react-router-dom";
import { RiRobot2Line } from "react-icons/ri";
import { dark } from "@clerk/themes";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
// import Footer from "../components/Footer.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={"/"}
      appearance={{ baseTheme: dark }}
    >
      <div className="w-ful h-screen relative flex flex-col text-gray-300">
        <nav className=" h-18 fixed z-[10000] backdrop-blur-[5px] top-0 right-0 left-0 flex items-center justify-between bg-[#0000004e] py-4 px-10">
          <div className="text-2xl">
            <Link to={"/"} className="flex items-center gap-2">
              <RiRobot2Line className="text-cyan-400 hover:text-cyan-100  transition-all duration-300 text-3xl" />
              <span className="font-semibold hover:text-gray-100 transition-all duration-300">
                BOT4U
              </span>
            </Link>
          </div>

          <div className="text-2xl px-2">
            <SignedIn>
              <div className="w-10 h-10 border-2 border-purple-500 flex items-center justify-center rounded-full ">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <Link
                to={"/sign-in"}
                className=" border-gray-400 hover:border-gray-100 flex items-center justify-center"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </nav>
        <main className="h-full pt-18 w-full relative flex-grow">
          <Outlet />
          {/* <footer>
            <Footer />
          </footer> */}
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
