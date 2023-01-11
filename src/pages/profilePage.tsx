import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useWindowContext } from "../hooks/useWindowContext";
import { MessageDocument, UnoccupiedMessageType } from "../algos/New";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PleaseLogIn from "../components/LogIn&SignUp/Please2";
import MessageWindowProfile from "../components/MessageWindow/Profile/MessageWindow.profile.handler";
import { useEffect } from "react";

const ProfilePage = () => {
  const { authState } = useAuthContext();
  const user = authState.user;

  const { messageState } = useMessageContext();
  const messages = messageState.messages;

  const { windowDispatch } = useWindowContext();

  const whatToReturn = (
    messageArray: (MessageDocument | UnoccupiedMessageType)[],
    username: string
  ) => {
    let returnMessage: MessageDocument | UnoccupiedMessageType = {
      _id: "NoID",
      color: "#BABABA",
      username: "",
      msg: "",
      location: -1,
    };
    for (let message of messageArray) {
      if (message.username === username) {
        returnMessage = message;
      }
    }
    return returnMessage;
  };

  if (!user) {
    return (
      <Container>
        <Row>
          <Col className="mt-3 justify-content-between">
            <PleaseLogIn />
          </Col>
        </Row>
      </Container>
    );
  }

  useEffect(() => {
    windowDispatch({
      type: "SET-PROFILE-DISPLAY",
      payload: {
        mode: "display",
        activeMessage: whatToReturn(messages, user.username),
      },
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col className="mt-3 ">
          <div className="max-width-mid justify-content-between">
            <MessageWindowProfile />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
