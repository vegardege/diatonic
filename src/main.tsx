import { render } from "preact";
import "modern-normalize/modern-normalize.css";
import "./index.css";
import "@diatonic/piano/styles.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  rootElement,
);
