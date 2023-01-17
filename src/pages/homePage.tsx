import { useWindowContext } from "../hooks/useWindowContext";
import MessageGrid from "../components/MessageGrid/MessageGrid";
import MessageWindow from "../components/MessageWindow/Home/MessageWindow.handler";

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const { windowState } = useWindowContext();
  const mode = windowState.mode;

  return (
    <>
      <MessageGrid />
      {mode !== "closed" && <MessageWindow />}
    </>
  );
};

export default HomePage;
