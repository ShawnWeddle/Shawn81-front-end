import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMessageContext } from "../../hooks/useMessageContext";
import { useLogOut } from "../../hooks/useLogOut";

const Header: React.FC = () => {
  const { authState } = useAuthContext();
  const user = authState.user;
  const navigate = useNavigate();
  const { messageState, messageDispatch } = useMessageContext();
  const { logOut } = useLogOut();
  const handleLogOut = () => {
    logOut();
  };

  // Fetch Messages

  useEffect(() => {
    const fetchMessages = async () => {
      const response: globalThis.Response = await fetch(
        "http://localhost:1337/api/messages"
      );
      const json = await response.json();

      if (response.ok) {
        messageDispatch({
          type: "ADD-ALL-MESSAGES",
          payload: { messages: json },
        });
      }
    };

    fetchMessages();
  }, []);

  return (
    <Navbar bg="primary">
      <Container>
        <Navbar.Brand>
          <Button
            className="m-2"
            variant="warning"
            size="lg"
            onClick={() => {
              navigate("/");
            }}
          >
            The81
          </Button>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {!user && (
            <Button
              className="m-2"
              variant="primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          )}
          {user && (
            <Button
              className="m-2"
              variant="info"
              onClick={() => navigate(`/profile/${user.username}`)}
            >
              {user.username}
            </Button>
          )}

          {!user && (
            <Button
              className="m-2"
              variant="primary"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          )}
          {user && (
            <Button className="m-2" variant="primary" onClick={handleLogOut}>
              Log Out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
