import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import { useErrorContext } from "../../hooks/useErrorContext";
import {
  usernameValidator,
  passwordValidator,
  passwordConfirmationValidator,
} from "../../algos/signUpValidation";

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
      <div key={index} className="sign-in-error">
        {error.error.message}
      </div>
    ) : (
      <></>
    )
  );

  const passwordErrorList = errorState.map((error, index) =>
    error.error.type === "passwordError" ? (
      <div key={index} className="sign-in-error">
        {error.error.message}
      </div>
    ) : (
      <></>
    )
  );

  const passwordConfirmationErrorList = errorState.map((error, index) =>
    error.error.type === "passwordConfirmationError" ? (
      <div key={index} className="sign-in-error">
        {error.error.message}
      </div>
    ) : (
      <></>
    )
  );

  const connectionErrorList = errorState.map((error, index) =>
    error.error.type === "validationError" ? (
      <div key={index} className="sign-in-error">
        {error.error.message}
      </div>
    ) : (
      <></>
    )
  );

  return (
    <div className="sign-in-form max-width-mid">
      <form>
        <h3> Sign Up </h3>
        <div className="sign-up-input-grid">
          <span>Username</span>
          <input
            type="text"
            className="sign-in-input"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <div></div>
          <div>
            <span className="tiny-text"> Show Password </span>
            <input
              type="checkbox"
              checked={showPassword}
              className="tiny-text"
              onChange={(e) => {
                if (e.target.checked) {
                  setShowPassword(true);
                } else {
                  setShowPassword(false);
                }
              }}
            />
          </div>

          <span>Password</span>
          <input
            type={showPassword ? "text" : "password"}
            className="sign-in-input"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <span>Confirm Password</span>
          <input
            type={showPassword ? "text" : "password"}
            className="sign-in-input"
            placeholder="Confirm password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
          />
        </div>

        <div className="flex-wrapper-center">
          <button className="blue-on-hover" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>

        <div className="sign-in-error-wrapper">
          {usernameErrorList}
          {passwordErrorList}
          {passwordConfirmationErrorList}
        </div>

        {hasSignedUp && connectionErrorList.length === 0 && (
          <div className="sign-in-error-wrapper">
            <div className="sign-up-success">
              Thank You for Signing Up! Press "Log In" to Log In.
            </div>
          </div>
        )}

        {hasSignedUp && connectionErrorList}
      </form>
    </div>
  );
};

export default SignUpForm;
