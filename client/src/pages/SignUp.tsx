import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[400px] h-[500px] bg-[#0000005d] rounded-2xl  p-10 flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-center">Sign up to BOT4U</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className="bg-[#1d1d1d84] p-2 rounded-lg outline-none border-b-2 border-transparent focus:border-blue-500 transition-all duration-300"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              className="bg-[#1d1d1d84] p-2 rounded-lg outline-none border-b-2 border-transparent focus:border-blue-500 transition-all duration-300"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              className="bg-[#1d1d1d84] p-2 rounded-lg outline-none border-b-2 border-transparent focus:border-blue-500 transition-all duration-300"
              type="text"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 p-2 rounded-lg cursor-pointer">
            Submit
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
              Sign in
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
