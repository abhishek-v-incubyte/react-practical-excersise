import type { Meta, StoryObj } from "@storybook/react";
import { SidebarMenu } from "../components/SidebarMenu";

const meta = {
  title: "Navigation Components/SidebarMenu",
  component: SidebarMenu,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    activeItemId: {
      control: "text",
      description: "The ID of the currently active menu item",
    },
    collapsed: {
      control: "boolean",
      description: "Whether the sidebar is collapsed (shows only icons)",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
    onToggleCollapse: {
      action: "toggled",
      description: "Callback when the sidebar is toggled",
    },
  },
} satisfies Meta<typeof SidebarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with simple menu items
export const Default: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard" },
      { id: "users", label: "Users", href: "/users" },
      { id: "settings", label: "Settings", href: "/settings" },
    ],
    activeItemId: "dashboard",
  },
};

// Menu with icons
export const WithIcons: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "🏠" },
      { id: "users", label: "Users", href: "/users", icon: "👥" },
      { id: "products", label: "Products", href: "/products", icon: "📦" },
      { id: "analytics", label: "Analytics", href: "/analytics", icon: "📊" },
      { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
    ],
    activeItemId: "users",
  },
};

// Menu with nested items
export const WithNestedItems: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "🏠" },
      {
        id: "products",
        label: "Products",
        icon: "📦",
        children: [
          { id: "all-products", label: "All Products", href: "/products" },
          {
            id: "categories",
            label: "Categories",
            href: "/products/categories",
          },
          { id: "inventory", label: "Inventory", href: "/products/inventory" },
        ],
      },
      {
        id: "users",
        label: "Users",
        icon: "👥",
        children: [
          { id: "all-users", label: "All Users", href: "/users" },
          { id: "roles", label: "Roles & Permissions", href: "/users/roles" },
          { id: "teams", label: "Teams", href: "/users/teams" },
        ],
      },
      { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
    ],
    activeItemId: "all-products",
  },
};

// Menu with groups
export const WithGroups: Story = {
  args: {
    items: [
      {
        id: "main-group",
        type: "group",
        label: "Main",
        children: [
          {
            id: "dashboard",
            label: "Dashboard",
            href: "/dashboard",
            icon: "🏠",
          },
          {
            id: "analytics",
            label: "Analytics",
            href: "/analytics",
            icon: "📊",
          },
        ],
      },
      {
        id: "management-group",
        type: "group",
        label: "Management",
        children: [
          {
            id: "products",
            label: "Products",
            icon: "📦",
            children: [
              { id: "all-products", label: "All Products", href: "/products" },
              {
                id: "categories",
                label: "Categories",
                href: "/products/categories",
              },
            ],
          },
          {
            id: "users",
            label: "Users",
            icon: "👥",
            children: [
              { id: "all-users", label: "All Users", href: "/users" },
              { id: "roles", label: "Roles", href: "/users/roles" },
            ],
          },
        ],
      },
      {
        id: "system-group",
        type: "group",
        label: "System",
        children: [
          { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
          { id: "help", label: "Help & Support", href: "/help", icon: "❓" },
        ],
      },
    ],
  },
};

// Menu with dividers
export const WithDividers: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "🏠" },
      { id: "analytics", label: "Analytics", href: "/analytics", icon: "📊" },
      { id: "divider-1", type: "divider" },
      { id: "products", label: "Products", href: "/products", icon: "📦" },
      { id: "users", label: "Users", href: "/users", icon: "👥" },
      { id: "divider-2", type: "divider" },
      { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
      { id: "logout", label: "Logout", href: "/logout", icon: "🚪" },
    ],
    activeItemId: "analytics",
  },
};

// Menu with disabled items
export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "🏠" },
      {
        id: "reports",
        label: "Reports (Coming Soon)",
        icon: "📈",
        disabled: true,
      },
      {
        id: "products",
        label: "Products",
        icon: "📦",
        children: [
          { id: "all-products", label: "All Products", href: "/products" },
          {
            id: "add-product",
            label: "Add Product",
            href: "/products/new",
            disabled: true,
          },
        ],
      },
      {
        id: "billing",
        label: "Billing (Pro Only)",
        icon: "💳",
        disabled: true,
      },
      { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
    ],
    activeItemId: "dashboard",
  },
};

// Collapsed sidebar
export const Collapsed: Story = {
  args: {
    collapsed: true,
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "🏠" },
      { id: "users", label: "Users", href: "/users", icon: "👥" },
      { id: "products", label: "Products", href: "/products", icon: "📦" },
      { id: "analytics", label: "Analytics", href: "/analytics", icon: "📊" },
      { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
    ],
    activeItemId: "products",
  },
};

// Custom render example
export const WithCustomRender: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "🏠" },
      {
        id: "notifications",
        label: "Notifications",
        icon: "🔔",
        render: () => (
          <>
            <span>🔔</span>
            <span style={{ flex: 1 }}>Notifications</span>
            <span
              style={{
                background: "#ef4444",
                color: "white",
                borderRadius: "9999px",
                padding: "0 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              3
            </span>
          </>
        ),
      },
      {
        id: "messages",
        label: "Messages",
        icon: "💬",
        render: () => (
          <>
            <span>💬</span>
            <span style={{ flex: 1 }}>Messages</span>
            <span
              style={{
                background: "#3b82f6",
                color: "white",
                borderRadius: "9999px",
                padding: "0 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              12
            </span>
          </>
        ),
      },
      { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
    ],
    activeItemId: "notifications",
  },
};

// Complete example with all features
export const CompleteExample: Story = {
  args: {
    items: [
      {
        id: "main-group",
        type: "group",
        label: "Main",
        children: [
          {
            id: "dashboard",
            label: "Dashboard",
            href: "/dashboard",
            icon: "🏠",
          },
          {
            id: "analytics",
            label: "Analytics",
            href: "/analytics",
            icon: "📊",
          },
        ],
      },
      { id: "divider-1", type: "divider" },
      {
        id: "content-group",
        type: "group",
        label: "Content Management",
        children: [
          {
            id: "pages",
            label: "Pages",
            icon: "📄",
            children: [
              { id: "all-pages", label: "All Pages", href: "/pages" },
              { id: "add-page", label: "Add New", href: "/pages/new" },
              { id: "templates", label: "Templates", href: "/pages/templates" },
            ],
          },
          {
            id: "media",
            label: "Media",
            icon: "🖼️",
            children: [
              { id: "library", label: "Library", href: "/media" },
              { id: "upload", label: "Upload", href: "/media/upload" },
            ],
          },
          {
            id: "comments",
            label: "Comments",
            href: "/comments",
            icon: "💬",
            disabled: true,
          },
        ],
      },
      { id: "divider-2", type: "divider" },
      {
        id: "users",
        label: "Users",
        icon: "👥",
        children: [
          { id: "all-users", label: "All Users", href: "/users" },
          { id: "roles", label: "Roles", href: "/users/roles" },
          {
            id: "permissions",
            label: "Permissions",
            href: "/users/permissions",
            disabled: true,
          },
        ],
      },
      { id: "divider-3", type: "divider" },
      {
        id: "system-group",
        type: "group",
        label: "System",
        children: [
          { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
          { id: "plugins", label: "Plugins", href: "/plugins", icon: "🔌" },
          { id: "help", label: "Help", href: "/help", icon: "❓" },
        ],
      },
    ],
    activeItemId: "all-pages",
  },
};
