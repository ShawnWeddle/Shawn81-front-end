import { useNavigate } from "react-router-dom";

const FootBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="foot-wrapper">
      <div className="foot-link-wrapper">
        <a href="http://shawnweddle.com">© 2023 Shawn Weddle</a>
      </div>
      <div className="foot-link-wrapper">•</div>
      <div
        className="foot-link-wrapper"
        onClick={() => {
          navigate("/bugs");
        }}
      >
        Report bugs or problems
      </div>
    </div>
  );
};

export default FootBar;
