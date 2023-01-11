import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const PleaseLogIn = () => {
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
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </Container>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default PleaseLogIn;
