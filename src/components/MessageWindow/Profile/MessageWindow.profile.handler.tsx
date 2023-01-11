import { useNavigate } from "react-router-dom";
import { useWindowContext } from "../../../hooks/useWindowContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import MessageWindowProfileCreate from "./MessageWindow.profile.create";
import MessageWindowProfileUpdate from "./MessageWindow.profile.update";
import MessageWindowProfileDisplay from "./MessageWindow.profile.display";

const MessageWindowProfile: React.FC = () => {
  const navigate = useNavigate();

  const { windowState } = useWindowContext();
  const mode = windowState.mode;
  const activeMessage = windowState.activeMessage;

  const { authState } = useAuthContext();
  const user = authState.user;

  if (mode === "create") {
    if (activeMessage) {
      if (user) {
        return (
          <MessageWindowProfileCreate
            username={user.username}
            message={activeMessage.msg}
            color={activeMessage.color}
            location={activeMessage.location}
          />
        );
      } else {
        navigate("/");
        return <></>;
      }
    } else {
      return <>You shouldn't be seeing this at all</>;
    }
  } else if (mode === "update") {
    if (activeMessage) {
      if (user) {
        return (
          <MessageWindowProfileUpdate
            username={user.username}
            message={activeMessage.msg}
            color={activeMessage.color}
            location={activeMessage.location}
          />
        );
      } else {
        navigate("/");
        return <></>;
      }
    } else {
      return <>You shouldn't be seeing this</>;
    }
  } else if (mode === "display") {
    if (activeMessage) {
      return (
        <MessageWindowProfileDisplay
          username={activeMessage.username}
          message={activeMessage.msg}
          color={activeMessage.color}
          location={activeMessage.location}
        />
      );
    } else {
      return <>You shouldn't be seeing this either</>;
    }
  } else {
    return <>CLOSED</>;
  }
};

export default MessageWindowProfile;
