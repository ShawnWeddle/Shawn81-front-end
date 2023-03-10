import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useWindowContext } from "../../hooks/useWindowContext";

interface MessageWindowCreateProps {
  username: string;
  message: string;
  location: number;
  page: string;
}

const MessageWindowCreate: React.FC<MessageWindowCreateProps> = (
  props: MessageWindowCreateProps
) => {
  const [username, setUsername] = useState<string>(props.username);
  const [msg, setMsg] = useState<string>("");
  const [location, setLocation] = useState<number>(props.location);

  const navigate = useNavigate();

  const { windowState, windowDispatch } = useWindowContext();

  const { createMessage, error, isLoading } = useCreateMessage();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createMessage(username, msg, location);
    windowDispatch({
      type: "CLOSED",
      payload: { mode: "closed", activeMessage: null },
    });
  };

  return (
    <div className="message-window-wrapper max-width-mid">
      <div className="message-window-top-wrapper">
        <div className="message-window-location">{props.location}</div>
        <div className="message-window-username">{props.username}</div>
        {props.page === "home" && (
          <div
            className="message-window-close-button"
            onClick={() => {
              windowDispatch({
                type: "CLOSED",
                payload: { mode: "closed", activeMessage: null },
              });
            }}
          >
            ✕
          </div>
        )}
        {props.page === "profile" && (
          <div
            className="message-window-close-button"
            onClick={() => {
              windowDispatch({
                type: "CLOSED",
                payload: { mode: "closed", activeMessage: null },
              });
              navigate("/");
            }}
          >
            ⮌
          </div>
        )}
      </div>
      <textarea
        className="message-window-text-area"
        placeholder="Please type your message here"
        rows={4}
        onChange={(e) => setMsg(e.target.value)}
      />
      <div className="flex-wrapper-flex-end">
        <span
          className={
            msg.length > 500 || msg.length < 1
              ? "message-window-count-fail"
              : "message-window-count-success"
          }
        >
          {msg.length}/500
        </span>
      </div>
      <div className="flex-wrapper-center">
        <button
          className="message-window-button blue-on-hover"
          onClick={handleSubmit}
          disabled={isLoading || msg.length < 1 || msg.length > 500}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MessageWindowCreate;
