import MessageGrid from "../components/MessageGrid/MessageGrid";
import MessageWindowHome from "../components/MessageWindow/MessageWindow.home";

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  return (
    <div className="flex-wrapper-center">
      <div className="home-page-wrapper">
        <div>
          <MessageWindowHome />
        </div>
        <div>
          <MessageGrid />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
