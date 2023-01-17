import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useMessageContext } from "./hooks/useMessageContext";
import NavBar from "./components/Nav/NavBar";
import HomePage from "./pages/homePage";
import SignUpPage from "./pages/signUpPage";
import LogInPage from "./pages/logInPage";
import ProfilePage from "./pages/profilePage";
import LoadingPage from "./pages/loadingPage";

export const App = () => {
  const [hasFetchedMessages, setHasFetchedMessages] = useState<boolean>(false);
  const { messageState, messageDispatch } = useMessageContext();

  useEffect(() => {
    const fetchMessages = async () => {
      const response: globalThis.Response = await fetch(
        "http://localhost:1337/api/messages"
      );
      const json = await response.json();

      if (response.ok) {
        messageDispatch({
          type: "ADD-ALL-MESSAGES",
          payload: { messages: json },
        });
        setHasFetchedMessages(true);
      }
    };

    fetchMessages();
  }, []);

  if (!hasFetchedMessages) {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoadingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
    );
  }
};
