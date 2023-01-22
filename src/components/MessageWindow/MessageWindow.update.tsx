import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateMessage } from "../../hooks/useUpdateMessage";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWindowContext } from "../../hooks/useWindowContext";

interface MessageWindowUpdateProps {
  username: string;
  message: string;
  location: number;
  page: string;
}

const MessageWindowUpdate: React.FC<MessageWindowUpdateProps> = (
  props: MessageWindowUpdateProps
) => {
  const [username, setUsername] = useState<string>(props.username);
  const [msg, setMsg] = useState<string>(props.message);
  const [location, setLocation] = useState<number>(props.location);
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const user = authState.user;

  const { windowState, windowDispatch } = useWindowContext();

  const { updateMessage, isLoading: isLoadingUpdate } = useUpdateMessage();

  const navigate = useNavigate();

  const { deleteMessage, isLoading: isLoadingDelete } = useDeleteMessage();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = async (e: any) => {
    setShowDeleteModal(false);
    await deleteMessage();
    navigate("/");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateMessage(username, msg, color, location);
    windowDispatch({
      type: "CLOSED",
      payload: { mode: "closed", activeMessage: null },
    });
    setHasUpdated(true);
    navigate("/");
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
        value={msg}
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
          disabled={isLoadingUpdate || msg.length < 1 || msg.length > 500}
        >
          Update
        </button>
        <button
          className="message-window-button red-on-hover"
          onClick={handleShowDeleteModal}
        >
          Delete
        </button>
      </div>
      {showDeleteModal && (
        <div className="flex-wrapper-center">
          <div className="d-modal">
            Hold up, {user?.username}! Are you sure you want to delete your
            message?
          </div>
          <div>
            <button
              className="message-window-final-delete-button red-on-hover"
              onClick={handleDelete}
              disabled={isLoadingDelete}
            >
              Yes, delete
            </button>
            <button
              className="message-window-final-delete-button blue-on-hover"
              onClick={handleCloseDeleteModal}
            >
              No, don't delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageWindowUpdate;
