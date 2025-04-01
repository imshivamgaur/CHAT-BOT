import { SignUp as SignUpPage } from "@clerk/clerk-react";

const SignUp = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <SignUpPage path="/sign-up" signInUrl="/sign-in" />
      </div>
    </>
  );
};

export default SignUp;
