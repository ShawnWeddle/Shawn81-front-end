import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useWindowContext } from "../hooks/useWindowContext";
import { MessageDocument, UnoccupiedMessageType } from "../algos/EmptyMessages";
import MessageWindowProfile from "../components/MessageWindow/MessageWindow.profile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileUsername, setProfileUsername] = useState<string | undefined>(
    useParams().username
  );
  console.log(profileUsername);

  const { authState } = useAuthContext();
  const user = authState.user;

  const { messageState } = useMessageContext();
  const messages = messageState.messages;

  const { windowDispatch } = useWindowContext();

  let returnMessage: MessageDocument | UnoccupiedMessageType | null = null;

  if (!profileUsername) {
    navigate("/");
    return <></>;
  }

  const checkMessage = (
    messageArray: (MessageDocument | UnoccupiedMessageType)[],
    username: string
  ) => {
    for (let message of messageArray) {
      if (message.username === username) {
        returnMessage = message;
      }
    }
    return returnMessage;
  };

  checkMessage(messages, profileUsername);

  if (returnMessage === null) {
    return (
      <div className="flex-wrapper-center">
        <div className="no-message-posted">
          <div>{profileUsername} has not posted a message </div>
          <div>
            <button
              className="message-window-button blue-on-hover"
              onClick={() => {
                navigate("/");
              }}
            >
              Home ⮌
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    windowDispatch({
      type: "SET-PROFILE-DISPLAY",
      payload: {
        mode: "display",
        activeMessage: checkMessage(messages, profileUsername),
      },
    });
  }, []);

  return (
    <div className="flex-wrapper-center">
      <MessageWindowProfile />
    </div>
  );
};

export default ProfilePage;
