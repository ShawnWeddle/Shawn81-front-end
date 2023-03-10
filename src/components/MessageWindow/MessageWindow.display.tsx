import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWindowContext } from "../../hooks/useWindowContext";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";

interface MessageWindowDisplayProps {
  username: string;
  message: string;
  location: number;
  page: string;
}

const MessageWindowDisplay: React.FC<MessageWindowDisplayProps> = (
  props: MessageWindowDisplayProps
) => {
  const { authState } = useAuthContext();
  const user = authState.user;

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  const navigate = useNavigate();

  const { deleteMessage, isLoading } = useDeleteMessage();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = async (e: any) => {
    setShowDeleteModal(false);
    await deleteMessage();
    windowDispatch({
      type: "CLOSED",
      payload: { mode: "closed", activeMessage: null },
    });
    navigate("/");
  };

  return (
    <div className="message-window-wrapper max-width-mid">
      <div className="message-window-top-wrapper">
        <div className="message-window-location">{props.location}</div>
        <div
          className="message-window-username cursor-pointer"
          onClick={() => {
            navigate(`/profile/${props.username}`);
          }}
        >
          {props.username}
        </div>
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
      <div className="message-window-msg">"{props.message}"</div>
      <div className="flex-wrapper-center">
        {user?.username === activeMessage?.username && (
          <div>
            <button
              className="message-window-button blue-on-hover"
              onClick={() => {
                windowDispatch({
                  type: "DISPLAY-TO-EDIT",
                  payload: { mode: "update", activeMessage: activeMessage },
                });
              }}
            >
              Edit
            </button>
            <button
              className="message-window-button red-on-hover"
              onClick={handleShowDeleteModal}
            >
              Delete
            </button>
          </div>
        )}
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
              disabled={isLoading}
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

export default MessageWindowDisplay;
