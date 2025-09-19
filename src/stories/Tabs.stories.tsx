import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../components/Tabs";
import { useState } from "react";

const meta = {
  title: "Navigation Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    activeTab: {
      control: "text",
      description: "The ID of the currently active tab",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the tabs",
    },
    keepMounted: {
      control: "boolean",
      description: "Whether to keep all tab panels mounted in the DOM",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
    onChange: {
      action: "changed",
      description: "Callback when the active tab changes",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example
export const Default: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Tab 1", content: "This is the content for Tab 1" },
      { id: "tab2", label: "Tab 2", content: "This is the content for Tab 2" },
      { id: "tab3", label: "Tab 3", content: "This is the content for Tab 3" },
    ],
  },
};

// Tabs with icons
export const WithIcons: Story = {
  args: {
    tabs: [
      {
        id: "home",
        label: "Home",
        icon: "🏠",
        content: "Welcome to the home tab!",
      },
      {
        id: "profile",
        label: "Profile",
        icon: "👤",
        content: "View and edit your profile here.",
      },
      {
        id: "settings",
        label: "Settings",
        icon: "⚙️",
        content: "Adjust your preferences.",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: "🔔",
        content: "Check your notifications.",
      },
    ],
  },
};

// Tabs with disabled items
export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      {
        id: "tab1",
        label: "Active Tab",
        content: "This tab is active and clickable.",
      },
      {
        id: "tab2",
        label: "Disabled Tab",
        content: "You should not see this content.",
        disabled: true,
      },
      {
        id: "tab3",
        label: "Another Active Tab",
        content: "This tab is also active.",
      },
      {
        id: "tab4",
        label: "Another Disabled",
        content: "This is also disabled.",
        disabled: true,
      },
    ],
  },
};

// Vertical orientation
export const VerticalTabs: Story = {
  args: {
    orientation: "vertical",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        icon: "📊",
        content: "Project overview and statistics.",
      },
      {
        id: "tasks",
        label: "Tasks",
        icon: "✅",
        content: "Manage your tasks and to-dos.",
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: "📅",
        content: "View your schedule and events.",
      },
      {
        id: "team",
        label: "Team",
        icon: "👥",
        content: "Collaborate with your team members.",
      },
      {
        id: "reports",
        label: "Reports",
        icon: "📈",
        content: "Generate and view reports.",
      },
    ],
  },
};

// Rich content in tabs
export const WithRichContent: Story = {
  args: {
    tabs: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "📊",
        content: (
          <div style={{ padding: "20px" }}>
            <h2>Dashboard Overview</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  background: "#f0f0f0",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3>Sales</h3>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#4caf50",
                  }}
                >
                  $12,345
                </p>
              </div>
              <div
                style={{
                  background: "#f0f0f0",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3>Orders</h3>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#2196f3",
                  }}
                >
                  156
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: "📈",
        content: (
          <div style={{ padding: "20px" }}>
            <h2>Analytics</h2>
            <p>
              View detailed analytics and insights about your business
              performance.
            </p>
            <div
              style={{
                marginTop: "20px",
                height: "200px",
                background: "#f5f5f5",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#999" }}>Chart placeholder</span>
            </div>
          </div>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        icon: "⚙️",
        content: (
          <div style={{ padding: "20px" }}>
            <h2>Settings</h2>
            <form style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Email Notifications
                  <input
                    type="checkbox"
                    style={{ marginLeft: "10px" }}
                    defaultChecked
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Theme
                  <select style={{ marginLeft: "10px", padding: "5px" }}>
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </label>
              </div>
              <button
                type="button"
                style={{
                  padding: "8px 16px",
                  background: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save Settings
              </button>
            </form>
          </div>
        ),
      },
    ],
  },
};

// Controlled tabs example
export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState("tab2");

    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <p>
            Active Tab: <strong>{activeTab}</strong>
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={() => setActiveTab("tab1")}>Go to Tab 1</button>
            <button onClick={() => setActiveTab("tab2")}>Go to Tab 2</button>
            <button onClick={() => setActiveTab("tab3")}>Go to Tab 3</button>
          </div>
        </div>
        <Tabs {...args} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
  args: {
    tabs: [
      { id: "tab1", label: "First Tab", content: "Content of the first tab" },
      { id: "tab2", label: "Second Tab", content: "Content of the second tab" },
      { id: "tab3", label: "Third Tab", content: "Content of the third tab" },
    ],
  },
};

// Keep mounted example
export const KeepMounted: Story = {
  args: {
    keepMounted: true,
    tabs: [
      {
        id: "form",
        label: "Form",
        content: (
          <div style={{ padding: "20px" }}>
            <h3>User Form</h3>
            <p>
              When keepMounted is true, form data is preserved when switching
              tabs.
            </p>
            <input
              type="text"
              placeholder="Enter your name"
              style={{ display: "block", marginTop: "10px", padding: "5px" }}
            />
            <input
              type="email"
              placeholder="Enter your email"
              style={{ display: "block", marginTop: "10px", padding: "5px" }}
            />
          </div>
        ),
      },
      {
        id: "preview",
        label: "Preview",
        content: (
          <div style={{ padding: "20px" }}>
            <h3>Preview</h3>
            <p>Switch back to the Form tab - your input will still be there!</p>
          </div>
        ),
      },
      {
        id: "help",
        label: "Help",
        content: (
          <div style={{ padding: "20px" }}>
            <h3>Help</h3>
            <p>This demonstrates the keepMounted prop functionality.</p>
          </div>
        ),
      },
    ],
  },
};

// Lazy loading example
export const LazyLoading: Story = {
  args: {
    tabs: [
      {
        id: "immediate",
        label: "Immediate",
        content: "This content loads immediately.",
      },
      {
        id: "lazy1",
        label: "Lazy Tab 1",
        content: () => {
          // Simulate expensive computation
          console.log("Lazy Tab 1 content is being loaded...");
          return (
            <div>
              <p>This content was loaded lazily when you clicked the tab.</p>
              <p>Check the console to see when it was loaded.</p>
            </div>
          );
        },
      },
      {
        id: "lazy2",
        label: "Lazy Tab 2",
        content: () => {
          console.log("Lazy Tab 2 content is being loaded...");
          return (
            <div>
              <p>Another lazy loaded tab!</p>
              <p>Content is only rendered when needed.</p>
            </div>
          );
        },
      },
    ],
  },
};

// Many tabs example
export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 10 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      content: `Content for Tab ${
        i + 1
      }. Use arrow keys to navigate between tabs when focused.`,
      disabled: i === 3 || i === 7, // Disable tabs 4 and 8
    })),
  },
};

// Responsive tabs
export const ResponsiveTabs: Story = {
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Tabs {...args} />
    </div>
  ),
  args: {
    tabs: [
      {
        id: "mobile",
        label: "Mobile",
        icon: "📱",
        content: "Design for mobile devices with responsive layouts.",
      },
      {
        id: "tablet",
        label: "Tablet",
        icon: "📋",
        content: "Optimize for tablet screens and touch interactions.",
      },
      {
        id: "desktop",
        label: "Desktop",
        icon: "💻",
        content: "Full desktop experience with all features enabled.",
      },
      {
        id: "tv",
        label: "TV",
        icon: "📺",
        content: "Large screen optimizations for TV displays.",
      },
    ],
  },
};
