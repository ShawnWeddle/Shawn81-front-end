import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateMessage } from "../../../hooks/useUpdateMessage";
import { useDeleteMessage } from "../../../hooks/useDeleteMessage";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useWindowContext } from "../../../hooks/useWindowContext";

interface MessageWindowUpdateProps {
  username: string;
  message: string;
  color: string;
  location: number;
}

const MessageWindowUpdate: React.FC<MessageWindowUpdateProps> = (
  props: MessageWindowUpdateProps
) => {
  const [username, setUsername] = useState<string>(props.username);
  const [msg, setMsg] = useState<string>(props.message);
  const [color, setColor] = useState<string>(props.color);
  const [location, setLocation] = useState<number>(props.location);
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const user = authState.user;

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

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
      type: "SET-DISPLAY",
      payload: { mode: "display", activeMessage: activeMessage },
    });
    setHasUpdated(true);
  };

  return (
    <div className="message-window-wrapper max-width-mid">
      <div className="message-window-top-wrapper">
        <div className="message-window-location">{props.location}</div>
        <div className="message-window-username">{props.username}</div>
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
          className="message-window-submit-button blue-on-hover"
          onClick={handleSubmit}
          disabled={isLoadingUpdate || msg.length < 1 || msg.length > 500}
        >
          UPDATE
        </button>
        <button
          className="message-window-delete-button red-on-hover"
          onClick={handleShowDeleteModal}
        >
          DELETE
        </button>
      </div>
      {showDeleteModal && (
        <div className="flex-wrapper-center">
          <div className="delete-modal">
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

/*<Card className="my-3">
      <Card.Header>
        <Container>
          <Row>
            <Col xs={1}>
              <Card.Title className="text-left text-nowrap">
                {location}
              </Card.Title>
            </Col>
            <Col xs={10}>
              <Card.Title className="text-center">{username}</Card.Title>
            </Col>
            <Col xs={1}>
              <Button
                className="btn-close"
                onClick={() => {
                  windowDispatch({
                    type: "CLOSED",
                    payload: { mode: "closed", activeMessage: null },
                  });
                }}
              />
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your message here."
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            ></Form.Control>
            <InputGroup>
              <InputGroup.Text>Select your color</InputGroup.Text>
              <Form.Control
                type="color"
                defaultValue={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <InputGroup.Text
                className={msg.length > 500 ? "text-danger" : "text-dark"}
              >
                {msg.length}/500
              </InputGroup.Text>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || msg.length < 1 || msg.length > 500}
              >
                Update
              </Button>
              <DeleteButton />
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card> */
