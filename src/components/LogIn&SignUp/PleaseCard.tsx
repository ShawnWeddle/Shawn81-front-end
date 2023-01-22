import { useNavigate } from "react-router-dom";

const PleaseCard = () => {
  const navigate = useNavigate();
  return (
    <div className="message-window-wrapper max-width-mid">
      <div className="flex-wrapper-center">
        <div className="d-modal">
          {" "}
          Please{" "}
          <button
            className="message-window-button blue-on-hover"
            onClick={() => {
              navigate("/signup");
            }}
          >
            {" "}
            Sign Up{" "}
          </button>{" "}
          or{" "}
          <button
            className="message-window-button blue-on-hover"
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Log In{" "}
          </button>{" "}
          to post a message
        </div>
      </div>
    </div>
  );
};

export default PleaseCard;
