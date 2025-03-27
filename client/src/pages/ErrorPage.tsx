import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen  text-white">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to={"/"}>
          <button className=" cursor-pointer px-4 py-2 bg-[#000000] border-1 border-[#ffffff59] text-white rounded hover:bg-[#13131333] transition">
            Go Back to Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
