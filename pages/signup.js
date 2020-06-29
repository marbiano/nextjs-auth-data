import SignupForm from "../components/SignupForm";
import { ProvideAuth } from "../lib/use-auth.js";

const SignUp = () => {
  return (
    <ProvideAuth>
      <SignupForm />
    </ProvideAuth>
  );
};

export default SignUp;
