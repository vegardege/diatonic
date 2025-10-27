import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it("renders the piano component", () => {
    render(<App />);
    // Check for the piano container
    const pianoElement = document.querySelector(".piano");
    expect(pianoElement).toBeInTheDocument();
  });

  it("renders navigation section", () => {
    render(<App />);
    // Check for nav element
    const navElement = document.querySelector("nav");
    expect(navElement).toBeInTheDocument();
  });
});
