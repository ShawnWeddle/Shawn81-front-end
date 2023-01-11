import { useState } from "react";
import { useUpdateMessage } from "../../../hooks/useUpdateMessage";
import { useWindowContext } from "../../../hooks/useWindowContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import DeleteButton from "../DeleteButton";

interface MessageWindowProfileUpdateProps {
  username: string;
  message: string;
  color: string;
  location: number;
}

const MessageWindowProfileUpdate: React.FC<MessageWindowProfileUpdateProps> = (
  props: MessageWindowProfileUpdateProps
) => {
  const [username, setUsername] = useState<string>(props.username);
  const [msg, setMsg] = useState<string>(props.message);
  const [color, setColor] = useState<string>(props.color);
  const [location, setLocation] = useState<number>(props.location);
  const [hasUpdated, setHasUpdated] = useState<boolean>(false);

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  const { updateMessage, error, isLoading } = useUpdateMessage();

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
    <Card className="my-3">
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
                onClick={() => {
                  windowDispatch({
                    type: "SET-PROFILE-DISPLAY",
                    payload: { mode: "display", activeMessage: activeMessage },
                  });
                }}
              >
                {String.fromCharCode(11148)}
              </Button>
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
            />
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
    </Card>
  );
};

export default MessageWindowProfileUpdate;
