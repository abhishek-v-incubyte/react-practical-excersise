import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Breadcrumb } from "../components/Breadcrumb";

describe("Breadcrumb", () => {
  it("renders a single breadcrumb item", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }]} />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders multiple breadcrumb items with separators", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Electronics", href: "/products/electronics" },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Electronics" })
    ).toBeInTheDocument();

    // Check for separators (default is /)
    const separators = screen.getAllByText("/");
    expect(separators).toHaveLength(2); // 2 separators for 3 items
  });

  it("renders last item as text (not clickable) by default", () => {
    render(
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Current Page" }]}
      />
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Current Page" })
    ).not.toBeInTheDocument();
  });

  it("calls onClick handler when breadcrumb is clicked", () => {
    const handleClick = vi.fn();

    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/", onClick: handleClick },
          { label: "About", href: "/about" },
        ]}
      />
    );

    fireEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("uses custom separator when provided", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
        ]}
        separator=">"
      />
    );

    expect(screen.getByText(">")).toBeInTheDocument();
  });

  it("uses custom separator component when provided", () => {
    const CustomSeparator = () => <span data-testid="custom-separator">→</span>;

    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
        ]}
        separator={<CustomSeparator />}
      />
    );

    expect(screen.getByTestId("custom-separator")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(
      <Breadcrumb
        items={[{ label: "Home", href: "/" }]}
        className="custom-breadcrumb"
      />
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("custom-breadcrumb");
  });

  it("has proper ARIA attributes for accessibility", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
        ]}
      />
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("marks current page with aria-current", () => {
    render(
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Current Page" }]}
      />
    );

    const currentPage = screen.getByText("Current Page");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });

  it("allows all items to be clickable when lastItemClickable is true", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
        ]}
        lastItemClickable={true}
      />
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
  });

  it("renders breadcrumb items in ordered list", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
        ]}
      />
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("handles empty items array", () => {
    render(<Breadcrumb items={[]} />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("supports custom item className", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/", className: "home-link" },
          { label: "Products", href: "/products" },
        ]}
      />
    );

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveClass("home-link");
  });

  it("prevents default when onClick is provided without href", () => {
    const handleClick = vi.fn((e: React.MouseEvent) => {
      e.preventDefault();
    });

    render(
      <Breadcrumb
        items={[{ label: "Home", onClick: handleClick }, { label: "Products" }]}
      />
    );

    const homeItem = screen.getByText("Home");
    fireEvent.click(homeItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
