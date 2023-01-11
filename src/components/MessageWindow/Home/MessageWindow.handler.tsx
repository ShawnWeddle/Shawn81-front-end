import { useWindowContext } from "../../../hooks/useWindowContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import MessageWindowCreate from "./MessageWindow.create";
import MessageWindowUpdate from "./MessageWindow.update";
import MessageWindowDisplay from "./MessageWindow.display";
import PleaseBlurb from "../../LogIn&SignUp/Please";

const MessageWindow: React.FC = () => {
  const { windowState, windowDispatch } = useWindowContext();
  const mode = windowState.mode;
  const activeMessage = windowState.activeMessage;

  const { authState } = useAuthContext();
  const user = authState.user;

  if (mode === "create") {
    if (activeMessage) {
      if (user) {
        return (
          <MessageWindowCreate
            username={user.username}
            message={activeMessage.msg}
            color={activeMessage.color}
            location={activeMessage.location}
          />
        );
      } else {
        return <PleaseBlurb />;
      }
    } else {
      return <>You shouldn't be seeing this</>;
    }
  } else if (mode === "update") {
    if (activeMessage) {
      if (user) {
        return (
          <MessageWindowUpdate
            username={user.username}
            message={activeMessage.msg}
            color={activeMessage.color}
            location={activeMessage.location}
          />
        );
      } else {
        return <PleaseBlurb />;
      }
    } else {
      return <>You shouldn't be seeing this</>;
    }
  } else if (mode === "display") {
    if (activeMessage) {
      return (
        <MessageWindowDisplay
          username={activeMessage.username}
          message={activeMessage.msg}
          color={activeMessage.color}
          location={activeMessage.location}
        />
      );
    } else {
      return <>You shouldn't be seeing this</>;
    }
  } else {
    return <>CLOSED</>;
  }
};

export default MessageWindow;
