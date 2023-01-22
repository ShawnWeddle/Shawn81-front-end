import { useWindowContext } from "../../hooks/useWindowContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import MessageWindowCreate from "./MessageWindow.create";
import MessageWindowUpdate from "./MessageWindow.update";
import MessageWindowDisplay from "./MessageWindow.display";
import PleaseCard from "../LogIn&SignUp/PleaseCard";

const MessageWindowHome: React.FC = () => {
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
            location={activeMessage.location}
            page="home"
          />
        );
      } else {
        return <PleaseCard />;
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
            location={activeMessage.location}
            page="home"
          />
        );
      } else {
        return <PleaseCard />;
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
          location={activeMessage.location}
          page="home"
        />
      );
    } else {
      return <>You shouldn't be seeing this</>;
    }
  } else {
    return <>CLOSED</>;
  }
};

export default MessageWindowHome;
