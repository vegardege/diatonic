import React from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import "./index.css";
import "@diatonic/piano/styles.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
