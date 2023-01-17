import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useWindowContext } from "../../../hooks/useWindowContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import { StyledBackground } from "../../../styles/Background.styles";

interface MessageWindowProfileDisplayProps {
  username: string;
  message: string;
  color: string;
  location: number;
}

const MessageWindowProfileDisplay: React.FC<
  MessageWindowProfileDisplayProps
> = (props: MessageWindowProfileDisplayProps) => {
  const { authState } = useAuthContext();
  const user = authState.user;

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  const navigate = useNavigate();

  return (
    <Card className="my-3">
      <Card.Header>
        <Container>
          <Row>
            <Col xs={1}>
              <Card.Title className="text-left text-nowrap">
                {props.location}
              </Card.Title>
            </Col>
            <Col xs={10}>
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
      <div>
        <Card.Body>
          <Card.Text>"{props.message}"</Card.Text>
        </Card.Body>
      </div>
      <Card.Footer>
        {user?.username === activeMessage?.username && (
          <ButtonGroup>
            <EditButton />
            <DeleteButton />
          </ButtonGroup>
        )}
      </Card.Footer>
    </Card>
  );
};

export default MessageWindowProfileDisplay;
