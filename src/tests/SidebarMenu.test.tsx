import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SidebarMenu } from "../components/SidebarMenu";

describe("SidebarMenu", () => {
  it("renders menu items", () => {
    render(
      <SidebarMenu
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "about", label: "About", href: "/about" },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("renders menu items with icons", () => {
    render(
      <SidebarMenu
        items={[
          {
            id: "dashboard",
            label: "Dashboard",
            href: "/dashboard",
            icon: <span data-testid="dashboard-icon">🏠</span>,
          },
        ]}
      />
    );

    expect(screen.getByTestId("dashboard-icon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("highlights active menu item", () => {
    render(
      <SidebarMenu
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "about", label: "About", href: "/about" },
        ]}
        activeItemId="about"
      />
    );

    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toHaveAttribute("aria-current", "page");
    expect(aboutLink).toHaveClass("active");
  });

  it("calls onClick handler when menu item is clicked", () => {
    const handleClick = vi.fn();

    render(
      <SidebarMenu
        items={[{ id: "home", label: "Home", onClick: handleClick }]}
      />
    );

    fireEvent.click(screen.getByText("Home"));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith("home");
  });

  it("renders nested menu items", () => {
    render(
      <SidebarMenu
        items={[
          {
            id: "products",
            label: "Products",
            children: [
              {
                id: "electronics",
                label: "Electronics",
                href: "/products/electronics",
              },
              { id: "clothing", label: "Clothing", href: "/products/clothing" },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Electronics" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Clothing" })).toBeInTheDocument();
  });

  it("toggles nested menu items on click", () => {
    render(
      <SidebarMenu
        items={[
          {
            id: "settings",
            label: "Settings",
            children: [
              { id: "profile", label: "Profile", href: "/settings/profile" },
              { id: "security", label: "Security", href: "/settings/security" },
            ],
          },
        ]}
        defaultExpanded={[]}
      />
    );

    // Initially children should be hidden
    expect(
      screen.queryByRole("link", { name: "Profile" })
    ).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText("Settings"));

    // Children should be visible
    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Security" })).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText("Settings"));

    // Children should be hidden again
    expect(
      screen.queryByRole("link", { name: "Profile" })
    ).not.toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(
      <SidebarMenu
        items={[{ id: "home", label: "Home", href: "/" }]}
        className="custom-sidebar"
      />
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("custom-sidebar");
  });

  it("supports disabled menu items", () => {
    render(
      <SidebarMenu
        items={[{ id: "home", label: "Home", href: "/", disabled: true }]}
      />
    );

    const homeLink = screen.getByText("Home").closest("a, div");
    expect(homeLink).toHaveClass("disabled");
    expect(homeLink).toHaveAttribute("aria-disabled", "true");
  });

  it("renders menu groups with titles", () => {
    render(
      <SidebarMenu
        items={[
          {
            id: "main-group",
            label: "Main Navigation",
            type: "group",
            children: [
              { id: "home", label: "Home", href: "/" },
              { id: "about", label: "About", href: "/about" },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText("Main Navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("renders dividers between items", () => {
    render(
      <SidebarMenu
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "divider-1", type: "divider" },
          { id: "settings", label: "Settings", href: "/settings" },
        ]}
      />
    );

    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
  });

  it("supports collapsible sidebar", () => {
    render(
      <SidebarMenu
        items={[{ id: "home", label: "Home", href: "/" }]}
        collapsible={true}
        collapsed={false}
        onToggleCollapse={vi.fn()}
      />
    );

    const toggleButton = screen.getByRole("button", { name: /toggle/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it("renders in collapsed state showing only icons", () => {
    render(
      <SidebarMenu
        items={[
          {
            id: "home",
            label: "Home",
            href: "/",
            icon: <span data-testid="home-icon">🏠</span>,
          },
        ]}
        collapsible={true}
        collapsed={true}
      />
    );

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeVisible();
  });

  it("has proper ARIA attributes for accessibility", () => {
    render(
      <SidebarMenu
        items={[{ id: "home", label: "Home", href: "/" }]}
        ariaLabel="Main navigation"
      />
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });

  it("supports custom render for menu items", () => {
    render(
      <SidebarMenu
        items={[
          {
            id: "custom",
            label: "Custom Item",
            render: () => <div data-testid="custom-render">Custom Content</div>,
          },
        ]}
      />
    );

    expect(screen.getByTestId("custom-render")).toBeInTheDocument();
    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  it("maintains expanded state for multiple nested items", () => {
    render(
      <SidebarMenu
        items={[
          {
            id: "menu1",
            label: "Menu 1",
            children: [{ id: "item1", label: "Item 1", href: "/item1" }],
          },
          {
            id: "menu2",
            label: "Menu 2",
            children: [{ id: "item2", label: "Item 2", href: "/item2" }],
          },
        ]}
        defaultExpanded={["menu1"]}
      />
    );

    // Menu 1 should be expanded by default
    expect(screen.getByRole("link", { name: "Item 1" })).toBeInTheDocument();

    // Menu 2 should be collapsed
    expect(
      screen.queryByRole("link", { name: "Item 2" })
    ).not.toBeInTheDocument();
  });
});
