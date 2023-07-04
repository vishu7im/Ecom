import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/user";
import { AlertProvider } from "./context/alert";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <AlertProvider>
      <App />
    </AlertProvider>
  </AuthProvider>
);
