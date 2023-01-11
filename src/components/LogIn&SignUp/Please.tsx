import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const PleaseBlurb = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Card.Header></Card.Header>

      <Card.Body>
        <Container>
          <span>Please </span>
          <Button
            className="m-2"
            variant="primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>

          <span> or </span>
          <Button
            className="m-2"
            variant="primary"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>

          <span> to post a message.</span>
        </Container>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default PleaseBlurb;
