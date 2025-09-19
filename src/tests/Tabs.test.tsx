import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs } from "../components/Tabs";

describe("Tabs", () => {
  const defaultTabs = [
    { id: "tab1", label: "Tab 1", content: "Content for Tab 1" },
    { id: "tab2", label: "Tab 2", content: "Content for Tab 2" },
    { id: "tab3", label: "Tab 3", content: "Content for Tab 3" },
  ];

  it("renders all tab labels", () => {
    render(<Tabs tabs={defaultTabs} />);

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("displays the first tab content by default", () => {
    render(<Tabs tabs={defaultTabs} />);

    expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 3")).not.toBeInTheDocument();
  });

  it("switches content when clicking on tabs", () => {
    render(<Tabs tabs={defaultTabs} />);

    // Click on Tab 2
    fireEvent.click(screen.getByText("Tab 2"));
    expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 1")).not.toBeInTheDocument();

    // Click on Tab 3
    fireEvent.click(screen.getByText("Tab 3"));
    expect(screen.getByText("Content for Tab 3")).toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument();
  });

  it("renders with a specific active tab", () => {
    render(<Tabs tabs={defaultTabs} activeTab="tab2" />);

    expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 1")).not.toBeInTheDocument();
  });

  it("calls onChange when switching tabs", () => {
    const onChange = vi.fn();
    render(<Tabs tabs={defaultTabs} onChange={onChange} />);

    fireEvent.click(screen.getByText("Tab 2"));
    expect(onChange).toHaveBeenCalledWith("tab2");

    fireEvent.click(screen.getByText("Tab 3"));
    expect(onChange).toHaveBeenCalledWith("tab3");
  });

  it("supports disabled tabs", () => {
    const tabsWithDisabled = [
      { id: "tab1", label: "Tab 1", content: "Content for Tab 1" },
      {
        id: "tab2",
        label: "Tab 2",
        content: "Content for Tab 2",
        disabled: true,
      },
      { id: "tab3", label: "Tab 3", content: "Content for Tab 3" },
    ];

    const onChange = vi.fn();
    render(<Tabs tabs={tabsWithDisabled} onChange={onChange} />);

    const tab2Button = screen.getByRole("tab", { name: "Tab 2" });
    expect(tab2Button).toBeDisabled();

    fireEvent.click(tab2Button);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders with custom className", () => {
    render(<Tabs tabs={defaultTabs} className="custom-tabs" />);

    const tabsContainer = screen.getByRole("tablist").parentElement;
    expect(tabsContainer).toHaveClass("custom-tabs");
  });

  it("supports rendering custom content as React elements", () => {
    const tabsWithElements = [
      {
        id: "tab1",
        label: "Profile",
        content: (
          <div>
            <h3>User Profile</h3>
            <p>Name: John Doe</p>
          </div>
        ),
      },
      {
        id: "tab2",
        label: "Settings",
        content: <button>Save Settings</button>,
      },
    ];

    render(<Tabs tabs={tabsWithElements} />);

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
  });

  it("has proper ARIA attributes for accessibility", () => {
    render(<Tabs tabs={defaultTabs} />);

    // Check tablist
    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();

    // Check tabs
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");

    expect(tab1).toHaveAttribute("aria-controls");
    expect(tab2).toHaveAttribute("aria-controls");

    // Check tabpanel
    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel).toHaveAttribute("aria-labelledby", tab1.id);
  });

  it("supports keyboard navigation", () => {
    render(<Tabs tabs={defaultTabs} />);

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });

    // Focus on first tab
    tab1.focus();
    expect(document.activeElement).toBe(tab1);

    // Press right arrow
    fireEvent.keyDown(tab1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab2);

    // Press right arrow again
    fireEvent.keyDown(tab2, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab3);

    // Press right arrow at the end (should wrap to first)
    fireEvent.keyDown(tab3, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab1);

    // Press left arrow
    fireEvent.keyDown(tab1, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(tab3);
  });

  it("supports icons in tab labels", () => {
    const tabsWithIcons = [
      { id: "tab1", label: "Home", icon: "🏠", content: "Home content" },
      { id: "tab2", label: "Profile", icon: "👤", content: "Profile content" },
    ];

    render(<Tabs tabs={tabsWithIcons} />);

    expect(screen.getByText("🏠")).toBeInTheDocument();
    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  it("supports vertical orientation", () => {
    render(<Tabs tabs={defaultTabs} orientation="vertical" />);

    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveAttribute("aria-orientation", "vertical");
  });

  it("supports lazy loading of tab content", () => {
    const lazyContent = vi.fn(() => <div>Lazy loaded content</div>);
    const tabsWithLazy = [
      { id: "tab1", label: "Tab 1", content: "Regular content" },
      { id: "tab2", label: "Tab 2", content: lazyContent },
    ];

    render(<Tabs tabs={tabsWithLazy} />);

    // Lazy content should not be called initially
    expect(lazyContent).not.toHaveBeenCalled();

    // Click on tab 2
    fireEvent.click(screen.getByText("Tab 2"));

    // Lazy content should be called
    expect(lazyContent).toHaveBeenCalled();
    expect(screen.getByText("Lazy loaded content")).toBeInTheDocument();
  });

  it("maintains tab panel content when keepMounted is true", () => {
    render(<Tabs tabs={defaultTabs} keepMounted />);

    // All content should be in the DOM but only one visible
    expect(screen.getByText("Content for Tab 1")).toBeVisible();
    expect(screen.getByText("Content for Tab 2")).not.toBeVisible();
    expect(screen.getByText("Content for Tab 3")).not.toBeVisible();

    // Switch to tab 2
    fireEvent.click(screen.getByText("Tab 2"));

    expect(screen.getByText("Content for Tab 1")).not.toBeVisible();
    expect(screen.getByText("Content for Tab 2")).toBeVisible();
    expect(screen.getByText("Content for Tab 3")).not.toBeVisible();
  });

  it("skips disabled tabs during keyboard navigation", () => {
    const tabsWithDisabled = [
      { id: "tab1", label: "Tab 1", content: "Content 1" },
      { id: "tab2", label: "Tab 2", content: "Content 2", disabled: true },
      { id: "tab3", label: "Tab 3", content: "Content 3" },
    ];

    render(<Tabs tabs={tabsWithDisabled} />);

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });

    // Focus on first tab
    tab1.focus();

    // Press right arrow - should skip disabled tab2 and go to tab3
    fireEvent.keyDown(tab1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tab3);

    // Press left arrow - should skip disabled tab2 and go to tab1
    fireEvent.keyDown(tab3, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(tab1);
  });
});
