import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMessageContext } from "../../hooks/useMessageContext";
import { useLogOut } from "../../hooks/useLogOut";
import { LogoButton, StyledNav, StyledNavButton } from "./Nav.styles";

const NavBar: React.FC = () => {
  const { authState } = useAuthContext();
  const user = authState.user;
  const navigate = useNavigate();
  const { messageState, messageDispatch } = useMessageContext();
  const { logOut } = useLogOut();
  const handleLogOut = () => {
    logOut();
  };

  return (
    <StyledNav>
      <div className="nav-button-group-wrapper">
        <LogoButton
          className=""
          onClick={() => {
            navigate("/");
          }}
        >
          The81
        </LogoButton>
      </div>
      <div className="nav-button-group-wrapper">
        {!user && (
          <StyledNavButton className="" onClick={() => navigate("/signup")}>
            Sign Up
          </StyledNavButton>
        )}
        {user && (
          <StyledNavButton
            className=""
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            {user.username}
          </StyledNavButton>
        )}

        {!user && (
          <StyledNavButton className="" onClick={() => navigate("/login")}>
            Log In
          </StyledNavButton>
        )}
        {user && (
          <StyledNavButton className="" onClick={handleLogOut}>
            Log Out
          </StyledNavButton>
        )}
      </div>
    </StyledNav>
  );
};

export default NavBar;
