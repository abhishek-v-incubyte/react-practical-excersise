import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProfileCard } from "../components/ProfileCard";

describe("ProfileCard Component", () => {
  it("renders with name and bio", () => {
    render(
      <ProfileCard
        name="John Doe"
        bio="Software Developer with 5 years of experience"
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByText("Software Developer with 5 years of experience")
    ).toBeInTheDocument();
  });

  it("renders with avatar image and alt text", () => {
    render(
      <ProfileCard name="Jane Smith" avatar="/avatar.jpg" bio="UX Designer" />
    );

    const avatar = screen.getByAltText("Jane Smith avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/avatar.jpg");
  });

  it("renders with role/title", () => {
    render(
      <ProfileCard
        name="Bob Johnson"
        role="Senior Engineer"
        bio="Building scalable systems"
      />
    );

    expect(screen.getByText("Senior Engineer")).toBeInTheDocument();
  });

  it("renders with social links", () => {
    render(
      <ProfileCard
        name="Alice Brown"
        bio="Product Manager"
        socialLinks={[
          { platform: "linkedin", url: "https://linkedin.com/alice" },
          { platform: "twitter", url: "https://twitter.com/alice" },
        ]}
      />
    );

    const linkedinLink = screen.getByLabelText("LinkedIn profile");
    const twitterLink = screen.getByLabelText("Twitter profile");

    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/alice");
    expect(twitterLink).toHaveAttribute("href", "https://twitter.com/alice");
  });

  it("renders without avatar when not provided", () => {
    render(<ProfileCard name="No Avatar User" bio="Test bio" />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("applies profile-specific layout class", () => {
    const { container } = render(<ProfileCard name="Test User" bio="Test" />);

    expect(container.firstChild).toHaveClass("profile-card");
  });

  it("extends base Card functionality", () => {
    render(
      <ProfileCard
        name="Extended Profile"
        bio="Test bio"
        footer={<button>Contact</button>}
      />
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("provides semantic markup for profile information", () => {
    render(
      <ProfileCard
        name="Semantic Test"
        role="Developer"
        bio="Building things"
      />
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Semantic Test");
  });
});
