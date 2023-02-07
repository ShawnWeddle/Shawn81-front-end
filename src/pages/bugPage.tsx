import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBugReport } from "../hooks/useCreateBugReport";

interface BugPageProps {}

const BugPage: React.FC = () => {
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();
  const { createBugReport, error, isLoading } = useBugReport();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createBugReport(msg);
  };
  return (
    <div className="flex-wrapper-center">
      <div className="message-window-wrapper max-width-mid">
        <div className="message-window-top-wrapper">
          <div></div>
          <div className="message-window-username">Report Bug</div>
          <div
            className="message-window-close-button"
            onClick={() => {
              navigate("/");
            }}
          >
            ⮌
          </div>
        </div>
        <textarea
          className="message-window-text-area"
          placeholder="Please describe the bug or problem you are experiencing"
          rows={4}
          onChange={(e) => setMsg(e.target.value)}
        />
        <div className="flex-wrapper-flex-end">
          <span
            className={
              msg.length > 500 || msg.length < 1
                ? "message-window-count-fail"
                : "message-window-count-success"
            }
          >
            {msg.length}/500
          </span>
        </div>
        <div className="flex-wrapper-center">
          <button
            className="message-window-button blue-on-hover"
            onClick={handleSubmit}
            disabled={isLoading || msg.length < 1 || msg.length > 500}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugPage;
