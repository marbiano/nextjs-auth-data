import React from "react";
import { useAuth } from "../../lib/use-auth.js";
import { useRouter } from "next/router";

const SignupForm = () => {
  const auth = useAuth();
  const router = useRouter();

  if (auth.user) {
    router.push("/");
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="username"
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="password"
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="lastName"
            placeholder="Last Name"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="/signin"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
