import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ImageCard } from "../components/ImageCard";

describe("ImageCard Component", () => {
  it("renders with image and alt text", () => {
    render(<ImageCard image="/test-image.jpg" alt="Test image description" />);

    const img = screen.getByAltText("Test image description");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-image.jpg");
  });

  it("renders with title, image, and content", () => {
    render(
      <ImageCard
        title="Image Card Title"
        image="/test.jpg"
        alt="Test alt text"
        content="Image card content"
      />
    );

    expect(screen.getByText("Image Card Title")).toBeInTheDocument();
    expect(screen.getByAltText("Test alt text")).toBeInTheDocument();
    expect(screen.getByText("Image card content")).toBeInTheDocument();
  });

  it("requires alt text for accessibility", () => {
    render(<ImageCard image="/test.jpg" alt="Descriptive alt text" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Descriptive alt text");
  });

  it("applies image position prop", () => {
    const { container } = render(
      <ImageCard image="/test.jpg" alt="Test" imagePosition="bottom" />
    );

    expect(container.firstChild).toHaveClass("image-bottom");
  });

  it("renders without image when not provided", () => {
    render(<ImageCard title="No Image Card" content="Content without image" />);

    expect(screen.getByText("No Image Card")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("handles image loading error gracefully", () => {
    render(
      <ImageCard
        image="/invalid-image.jpg"
        alt="Fallback test"
        onImageError={() => {}}
      />
    );

    const img = screen.getByAltText("Fallback test");
    expect(img).toBeInTheDocument();
  });

  it("applies responsive image class", () => {
    render(<ImageCard image="/test.jpg" alt="Responsive image" />);

    const img = screen.getByAltText("Responsive image");
    expect(img).toHaveClass("card-image");
  });

  it("extends base Card component functionality", () => {
    render(
      <ImageCard
        title="Extended Card"
        image="/test.jpg"
        alt="Test"
        footer={<button>Action</button>}
      />
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});
