import { useAuthContext } from "../../../hooks/useAuthContext";
import { useWindowContext } from "../../../hooks/useWindowContext";
import { SetTextColorByCellColor } from "../../../algos/ColorAlgos";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import { StyledBackground } from "../../../styles/Background.styles";

interface MessageWindowDisplayProps {
  username: string;
  message: string;
  color: string;
  location: number;
}

const MessageWindowDisplay: React.FC<MessageWindowDisplayProps> = (
  props: MessageWindowDisplayProps
) => {
  const { authState } = useAuthContext();
  const user = authState.user;

  const { windowState, windowDispatch } = useWindowContext();
  const activeMessage = windowState.activeMessage;

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
      <StyledBackground
        backgroundColor={props.color}
        textColor={SetTextColorByCellColor(props.color)}
      >
        <Card.Body>
          <Card.Text>"{props.message}"</Card.Text>
        </Card.Body>
      </StyledBackground>
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

export default MessageWindowDisplay;
