import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../components/Navbar";
import React from "react";

describe("Navbar", () => {
  it("renders with logo", () => {
    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Company Logo" }}
        navLinks={[]}
        userMenu={{ username: "John Doe" }}
      />
    );

    const logo = screen.getByRole("img", { name: "Company Logo" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");
  });

  it("renders navigation links", () => {
    const navLinks = [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ];

    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo" }}
        navLinks={navLinks}
        userMenu={{ username: "John Doe" }}
      />
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("renders user menu with username", () => {
    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo" }}
        navLinks={[]}
        userMenu={{ username: "John Doe" }}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("calls onNavClick when nav link is clicked", () => {
    const handleNavClick = vi.fn();
    const navLinks = [{ label: "Home", href: "/", onClick: handleNavClick }];

    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo" }}
        navLinks={navLinks}
        userMenu={{ username: "John Doe" }}
      />
    );

    const homeLink = screen.getByRole("link", { name: "Home" });
    fireEvent.click(homeLink);

    expect(handleNavClick).toHaveBeenCalledTimes(1);
  });

  it("shows user menu dropdown when clicked", () => {
    const userMenuItems = [
      { label: "Profile", onClick: vi.fn() },
      { label: "Settings", onClick: vi.fn() },
      { label: "Logout", onClick: vi.fn() },
    ];

    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo" }}
        navLinks={[]}
        userMenu={{
          username: "John Doe",
          menuItems: userMenuItems,
        }}
      />
    );

    // Initially dropdown should not be visible
    expect(
      screen.queryByRole("button", { name: "Profile" })
    ).not.toBeInTheDocument();

    // Click user menu button
    const userMenuButton = screen.getByRole("button", { name: /John Doe/i });
    fireEvent.click(userMenuButton);

    // Dropdown should now be visible
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Settings" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("calls menu item onClick handlers", () => {
    const handleProfile = vi.fn();
    const handleLogout = vi.fn();

    const userMenuItems = [
      { label: "Profile", onClick: handleProfile },
      { label: "Logout", onClick: handleLogout },
    ];

    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo" }}
        navLinks={[]}
        userMenu={{
          username: "John Doe",
          menuItems: userMenuItems,
        }}
      />
    );

    // Open dropdown
    fireEvent.click(screen.getByRole("button", { name: /John Doe/i }));

    // Click logout
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(handleLogout).toHaveBeenCalledTimes(1);
    expect(handleProfile).not.toHaveBeenCalled();
  });

  it("renders with custom className", () => {
    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo" }}
        navLinks={[]}
        userMenu={{ username: "John Doe" }}
        className="custom-navbar"
      />
    );

    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveClass("custom-navbar");
  });

  it("renders logo as clickable link when href provided", () => {
    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo", href: "/" }}
        navLinks={[]}
        userMenu={{ username: "John Doe" }}
      />
    );

    const logoLink = screen.getByRole("link", { name: "Logo" });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("supports avatar image in user menu", () => {
    render(
      <Navbar
        logo={{ src: "/logo.png", alt: "Logo" }}
        navLinks={[]}
        userMenu={{
          username: "John Doe",
          avatar: "/avatar.jpg",
        }}
      />
    );

    const avatar = screen.getByRole("img", { name: "John Doe avatar" });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/avatar.jpg");
  });

  it("closes dropdown when clicking outside", () => {
    render(
      <div>
        <Navbar
          logo={{ src: "/logo.png", alt: "Logo" }}
          navLinks={[]}
          userMenu={{
            username: "John Doe",
            menuItems: [{ label: "Logout", onClick: vi.fn() }],
          }}
        />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    // Open dropdown
    fireEvent.click(screen.getByRole("button", { name: /John Doe/i }));
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside"));

    // Dropdown should be closed
    expect(
      screen.queryByRole("button", { name: "Logout" })
    ).not.toBeInTheDocument();
  });
});
