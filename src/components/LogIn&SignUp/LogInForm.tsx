import { useState } from "react";
import { useLogIn } from "../../hooks/useLogIn";
import { useErrorContext } from "../../hooks/useErrorContext";

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
        <h3> Log In </h3>
        <div className="log-in-input-grid">
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
        </div>

        <div className="flex-wrapper-center">
          <button onClick={handleSubmit}>Log In</button>
        </div>

        <div className="sign-in-error-wrapper">{loginErrorList}</div>
      </form>
    </div>
  );
};

export default LogInForm;
