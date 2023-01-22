import { useWindowContext } from "../hooks/useWindowContext";
import MessageGrid from "../components/MessageGrid/MessageGrid";
import MessageWindowHome from "../components/MessageWindow/MessageWindow.home";

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const { windowState } = useWindowContext();
  const mode = windowState.mode;

  return (
    <div className="flex-wrapper-center">
      <div className="home-page-wrapper">
        <MessageGrid />

        <div>{mode !== "closed" && <MessageWindowHome />}</div>
      </div>
    </div>
  );
};

export default HomePage;
