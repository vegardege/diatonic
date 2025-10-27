import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it("renders the piano component", () => {
    const { container } = render(<App />);
    // Check for piano component by looking for diatonic-piano class
    const pianoElement = container.querySelector(".diatonic-piano");
    expect(pianoElement).toBeInTheDocument();
  });

  it("renders navigation section", () => {
    render(<App />);
    // Check for nav element
    const navElement = document.querySelector("nav");
    expect(navElement).toBeInTheDocument();
  });
});
