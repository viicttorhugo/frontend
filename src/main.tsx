import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./firebase"; // garante init do Firebase antes do App
import "./styles.css"; // opcional

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
