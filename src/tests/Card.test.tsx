import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from "../components/Card";

describe("Card Component", () => {
  it("renders with title", () => {
    render(<Card title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders with content", () => {
    render(<Card content="Test content goes here" />);
    expect(screen.getByText("Test content goes here")).toBeInTheDocument();
  });

  it("renders with footer", () => {
    render(<Card footer="Test footer" />);
    expect(screen.getByText("Test footer")).toBeInTheDocument();
  });

  it("renders with title, content, and footer", () => {
    render(
      <Card title="Card Title" content="Card content" footer="Card footer" />
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
    expect(screen.getByText("Card footer")).toBeInTheDocument();
  });

  it("uses semantic HTML with article element", () => {
    const { container } = render(<Card title="Test" />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Card title="Test" className="custom-card" />);
    const article = container.querySelector("article");
    expect(article).toHaveClass("custom-card");
  });

  it("renders children when provided", () => {
    render(
      <Card>
        <p>Custom child content</p>
      </Card>
    );
    expect(screen.getByText("Custom child content")).toBeInTheDocument();
  });

  it("renders footer with React elements", () => {
    render(
      <Card
        title="Test"
        footer={
          <div>
            <button>Action 1</button>
            <button>Action 2</button>
          </div>
        }
      />
    );

    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  it("has proper heading structure with h2 for title", () => {
    render(<Card title="Heading Test" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Heading Test");
  });

  it("conditionally renders sections only when props are provided", () => {
    const { container } = render(<Card />);

    // Should not render header, content, or footer when no props
    expect(container.querySelector("header")).not.toBeInTheDocument();
    expect(container.querySelector(".card-content")).not.toBeInTheDocument();
    expect(container.querySelector("footer")).not.toBeInTheDocument();
  });
});
