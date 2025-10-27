import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    expect(container).toBeInTheDocument();
  });

  it("renders the piano component", () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    // Check for piano component by looking for diatonic-piano class
    const pianoElement = container.querySelector(".diatonic-piano");
    expect(pianoElement).toBeInTheDocument();
  });

  it("renders navigation section", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    // Check for nav element
    const navElement = document.querySelector("nav");
    expect(navElement).toBeInTheDocument();
  });
});
