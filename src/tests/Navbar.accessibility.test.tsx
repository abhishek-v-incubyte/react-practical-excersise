import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Navbar } from "../components/Navbar";

describe("Navbar Accessibility and Navigation Features", () => {
  const defaultProps = {
    logo: { src: "/logo.png", alt: "Company Logo" },
    navLinks: [
      { label: "Home", href: "/", active: true },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
    userMenu: {
      username: "John Doe",
      menuItems: [
        { label: "Profile", onClick: vi.fn() },
        { label: "Logout", onClick: vi.fn() },
      ],
    },
  };

  it("has proper navigation role and aria-label", () => {
    render(<Navbar {...defaultProps} />);

    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeInTheDocument();
  });

  it('marks active link with aria-current="page"', () => {
    render(<Navbar {...defaultProps} />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("aria-current", "page");

    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).not.toHaveAttribute("aria-current");
  });

  it("supports keyboard navigation with arrow keys", () => {
    render(<Navbar {...defaultProps} />);

    const links = screen
      .getAllByRole("link")
      .filter((link) =>
        ["Home", "About", "Services", "Contact"].includes(
          link.textContent || ""
        )
      );

    // Focus first link
    links[0].focus();
    expect(document.activeElement).toBe(links[0]);

    // Press right arrow
    fireEvent.keyDown(links[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(links[1]);

    // Press right arrow again
    fireEvent.keyDown(links[1], { key: "ArrowRight" });
    expect(document.activeElement).toBe(links[2]);

    // Press left arrow
    fireEvent.keyDown(links[2], { key: "ArrowLeft" });
    expect(document.activeElement).toBe(links[1]);

    // Test wrapping - right arrow on last item
    links[3].focus();
    fireEvent.keyDown(links[3], { key: "ArrowRight" });
    expect(document.activeElement).toBe(links[0]);

    // Test wrapping - left arrow on first item
    fireEvent.keyDown(links[0], { key: "ArrowLeft" });
    expect(document.activeElement).toBe(links[3]);
  });

  it("supports Home and End keys for navigation", () => {
    render(<Navbar {...defaultProps} />);

    const links = screen
      .getAllByRole("link")
      .filter((link) =>
        ["Home", "About", "Services", "Contact"].includes(
          link.textContent || ""
        )
      );

    // Focus middle link
    links[2].focus();

    // Press Home
    fireEvent.keyDown(links[2], { key: "Home" });
    expect(document.activeElement).toBe(links[0]);

    // Press End
    fireEvent.keyDown(links[0], { key: "End" });
    expect(document.activeElement).toBe(links[3]);
  });

  it("includes skip link for accessibility", () => {
    render(<Navbar {...defaultProps} />);

    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("has mobile menu toggle button with proper aria attributes", () => {
    render(<Navbar {...defaultProps} />);

    const toggleButton = screen.getByLabelText("Toggle navigation menu");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  });

  it("styles active links differently", () => {
    render(<Navbar {...defaultProps} />);

    const activeLink = screen.getByRole("link", { name: "Home" });
    const inactiveLink = screen.getByRole("link", { name: "About" });

    // Check active link has different color and border
    expect(activeLink).toHaveStyle({
      color: "#007bff",
      fontWeight: "600",
      borderBottom: "2px solid #007bff",
    });

    // Check inactive link
    expect(inactiveLink).toHaveStyle({
      color: "#333",
      fontWeight: "500",
    });
  });
});
