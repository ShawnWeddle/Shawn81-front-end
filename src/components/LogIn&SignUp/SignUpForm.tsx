import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import { useErrorContext } from "../../hooks/useErrorContext";
import {
  usernameValidator,
  passwordValidator,
  passwordConfirmationValidator,
} from "../../algos/signUpValidation";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { signUp, isLoading } = useSignUp();
  const { errorState, errorDispatch } = useErrorContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    errorDispatch({
      type: "REMOVE_ALL_ERRORS",
      payload: { error: { type: "N/A", message: "N/A" } },
    });
    const usernameErrorList = usernameValidator(username);
    const passwordErrorList = passwordValidator(password);
    const passwordConfirmationErrorList = passwordConfirmationValidator(
      password,
      passwordConfirmation
    );

    usernameErrorList.map((usernameError) => {
      errorDispatch({
        type: "SET_ERROR",
        payload: { error: { message: usernameError, type: "usernameError" } },
      });
    });

    passwordErrorList.map((passwordError) => {
      errorDispatch({
        type: "SET_ERROR",
        payload: { error: { message: passwordError, type: "passwordError" } },
      });
    });

    passwordConfirmationErrorList.map((passwordConfirmationError) => {
      errorDispatch({
        type: "SET_ERROR",
        payload: {
          error: {
            message: passwordConfirmationError,
            type: "passwordConfirmationError",
          },
        },
      });
    });

    if (
      usernameErrorList.length +
        passwordErrorList.length +
        passwordConfirmationErrorList.length >
      0
    ) {
      return;
    }
    await signUp(username, password, passwordConfirmation);
    setHasSignedUp(true);
  };

  const usernameErrorList = errorState.map((error, index) =>
    error.error.type === "usernameError" ? (
      <Alert variant="danger" key={index}>
        {error.error.message}
      </Alert>
    ) : (
      <></>
    )
  );

  const passwordErrorList = errorState.map((error, index) =>
    error.error.type === "passwordError" ? (
      <Alert variant="danger" key={index}>
        {error.error.message}
      </Alert>
    ) : (
      <></>
    )
  );

  const passwordConfirmationErrorList = errorState.map((error, index) =>
    error.error.type === "passwordConfirmationError" ? (
      <Alert variant="danger" key={index}>
        {error.error.message}
      </Alert>
    ) : (
      <></>
    )
  );

  const connectionErrorList = errorState.map((error, index) =>
    error.error.type === "validationError" ? (
      <Alert variant="info" key={index}>
        {error.error.message}
      </Alert>
    ) : (
      <></>
    )
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={10} md={6} xl={4}>
              <h3 className="mt-3 mb-3"> Sign Up </h3>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                {usernameErrorList}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Check
                  type="switch"
                  id="show-password-switch-sign"
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
                {passwordErrorList}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicPasswordConfirmation"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  value={passwordConfirmation}
                />
                {passwordConfirmationErrorList}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="my-2"
              >
                Sign Up
              </Button>

              {hasSignedUp && connectionErrorList.length === 0 && (
                <Alert variant="success">
                  Thank You for Signing Up! Press "Log In" to Log In.
                </Alert>
              )}

              {hasSignedUp && connectionErrorList}
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default SignUpForm;
