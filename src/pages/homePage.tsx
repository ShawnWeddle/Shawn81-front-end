import { useWindowContext } from "../hooks/useWindowContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageGrid from "../components/MessageGrid/MessageGrid";
import MessageWindow from "../components/MessageWindow/Home/MessageWindow.handler";

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const { windowState } = useWindowContext();
  const mode = windowState.mode;

  return (
    <Container>
      <Row>
        <Col className="mt-3 justify-content-between">
          <MessageGrid></MessageGrid>
        </Col>
        {mode !== "closed" && (
          <Col className="mx-3">
            <MessageWindow></MessageWindow>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
