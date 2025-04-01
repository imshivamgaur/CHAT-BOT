import { SignIn as SignInPage } from "@clerk/clerk-react";
const SignIn = () => {
  return (
    <>
      <header className=" w-full h-full flex items-center justify-center">
        <SignInPage path="/sign-in" signUpUrl="/sign-up" />
      </header>
    </>
  );
};

export default SignIn;
