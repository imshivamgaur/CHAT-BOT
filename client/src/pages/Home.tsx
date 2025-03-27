import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col h-full md:flex-row items-center bg-transparent text-white p-10 gap-10 justify-evenly ">
        {/* Left Section */}
        <div className=" w-full md:w-[500px] h-full flex flex-col gap-4 items-center justify-center text-center">
          <h1 className="text-[4rem] lg:text-[5rem] font-bold bg-gradient-to-r from-cyan-400 via-blue-700 to-red-500 bg-clip-text text-transparent leading-none">
            BOT4U AI
          </h1>

          <h2 className="text-[1.2rem] lg:text-[1.5rem] tracking-tight font-bold">
            Supercharge your creativity and productivity{" "}
          </h2>

          <p className="text-sm lg:text-lg text-gray-300 tracking-tight">
            Your intelligent chatbot assistant, powered by OpenAI. Get instant
            answers, coding help, and much more – anytime, anywhere.
          </p>
          <Link
            to={"/dashboard/"}
            className="px-5 lg:px-8 py-2 bg-zinc-950 hover:bg-zinc-900 transition-all duration-300 border-2 border-zinc-500 text-gray-300 hover: rounded-lg text-lg font-semibold"
          >
            Get Started
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[500px]  h-full flex items-center justify-center">
          <img
            src="/bot.png"
            alt="Chatbot Illustration"
            className="rounded-lg object-cover floating filter drop-shadow-[0px_5px_5px_rgba(193,100,255,0.8)]"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
