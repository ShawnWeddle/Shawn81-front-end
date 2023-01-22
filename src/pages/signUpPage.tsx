import SignUpForm from "../components/LogIn&SignUp/SignUpForm";

interface SignUpPageProps {}

const SignUpPage = (props: SignUpPageProps) => {
  return (
    <div className="flex-wrapper-center">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
