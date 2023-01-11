import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/homePage";
import SignUpPage from "./pages/signUpPage";
import LogInPage from "./pages/logInPage";
import ProfilePage from "./pages/profilePage";

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};
