import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "../src/App";
import { AuthContextProvider } from "../src/context/AuthContext";
import { WindowContextProvider } from "../src/context/WindowContext";
import { ErrorContextProvider } from "../src/context/ErrorContext";
import { MessageContextProvider } from "./context/MessageContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorContextProvider>
      <AuthContextProvider>
        <MessageContextProvider>
          <WindowContextProvider>
            <App />
          </WindowContextProvider>
        </MessageContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </React.StrictMode>
);
