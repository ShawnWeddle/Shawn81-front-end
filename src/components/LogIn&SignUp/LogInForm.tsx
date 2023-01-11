import { useState } from "react";
import { useLogIn } from "../../hooks/useLogIn";
import { useErrorContext } from "../../hooks/useErrorContext";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const LogInForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { logIn, isLoading } = useLogIn();
  const { errorState, errorDispatch } = useErrorContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    errorDispatch({
      type: "REMOVE_ALL_ERRORS",
      payload: { error: { type: "N/A", message: "N/A" } },
    });
    await logIn(username, password);
  };

  const loginErrorList = errorState.map((error, index) =>
    error.error.type === "loginError" ? (
      <Alert variant="danger" key={index}>
        {error.error.message}
      </Alert>
    ) : (
      <></>
    )
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={6} xl={4}>
            <h3 className="mt-3 mb-3"> Log In </h3>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Check
                type="switch"
                id="show-password-switch-log"
                label="Show Password"
                checked={showPassword}
                onChange={(e) => {
                  if (e.target.checked) {
                    setShowPassword(true);
                  } else {
                    setShowPassword(false);
                  }
                }}
              />
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="my-2"
            >
              Log In
            </Button>

            {loginErrorList}
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default LogInForm;
