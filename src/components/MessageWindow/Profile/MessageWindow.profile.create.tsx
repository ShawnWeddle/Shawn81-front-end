import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMessage } from "../../../hooks/useCreateMessage";
import { useWindowContext } from "../../../hooks/useWindowContext";
import { useMessageContext } from "../../../hooks/useMessageContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

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
  const [msg, setMsg] = useState<string>("");
  const [color, setColor] = useState<string>(props.color);
  const [location, setLocation] = useState<number>(props.location);

  const { windowState, windowDispatch } = useWindowContext();
  const { messageState, messageDispatch } = useMessageContext();
  const messages = messageState.messages;

  const navigate = useNavigate();

  const { createMessage, error, isLoading } = useCreateMessage();

  const locationOptionsMid = messages.map((message, index) => {
    if (message._id === "NoID") {
      return <option key={index}>{message.location}</option>;
    } else {
      return null;
    }
  });

  const locationOptions = locationOptionsMid.filter(
    (locationOption) => locationOption !== null
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createMessage(username, msg, color, location);
  };

  return (
    <Card className="my-3">
      <Card.Header>
        <Container>
          <Row>
            <Col xs={3} md={2}>
              <Form.Select>{locationOptions}</Form.Select>
            </Col>

            <Col xs={8} md={9}>
              <Card.Title className="text-center">{props.username}</Card.Title>
            </Col>
            <Col xs={1}>
              <Button
                onClick={() => {
                  windowDispatch({
                    type: "CLOSED",
                    payload: { mode: "closed", activeMessage: null },
                  });
                  navigate("/");
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
              disabled={locationOptions.length === 0}
            ></Form.Control>
            <InputGroup>
              <InputGroup.Text>Select your color</InputGroup.Text>
              <Form.Control
                type="color"
                defaultValue={props.color}
                onChange={(e) => setColor(e.target.value)}
              />
              <InputGroup.Text
                className={msg.length < 501 ? "text-dark" : "text-danger"}
              >
                {msg.length}/500
              </InputGroup.Text>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  msg.length < 1 ||
                  msg.length > 500 ||
                  locationOptions.length === 0
                }
              >
                SUBMIT
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MessageWindowProfileUpdate;
