import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import LogInForm from "../components/LogIn&SignUp/LogInForm";

interface LogInPageProps {}

const LogInPage = (props: LogInPageProps) => {
  const navigate = useNavigate();
  const { authState } = useAuthContext();
  const user = authState.user;

  if (user) {
    navigate("/");
  }

  return <LogInForm />;
};

export default LogInPage;
