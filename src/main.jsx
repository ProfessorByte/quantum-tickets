import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import "@fontsource-variable/open-sans";
import "@fontsource/michroma";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
