import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMessageContext } from "../../hooks/useMessageContext";
import { useLogOut } from "../../hooks/useLogOut";

const NavBar: React.FC = () => {
  const { authState } = useAuthContext();
  const user = authState.user;
  const navigate = useNavigate();
  const { logOut } = useLogOut();
  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className="nav-wrapper">
      <div className="nav-button-group-wrapper">
        <div
          className="logo-button"
          onClick={() => {
            navigate("/");
          }}
        >
          The81
        </div>
      </div>
      <div className="nav-button-group-wrapper">
        {!user && (
          <button
            className="nav-button blue-on-hover"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}
        {user && (
          <button
            className="nav-button blue-on-hover"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            {user.username}
          </button>
        )}

        {!user && (
          <button
            className="nav-button blue-on-hover"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        )}
        {user && (
          <button className="nav-button blue-on-hover" onClick={handleLogOut}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
