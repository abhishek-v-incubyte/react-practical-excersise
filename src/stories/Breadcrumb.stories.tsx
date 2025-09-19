import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Breadcrumb } from "../components/Breadcrumb";

const meta = {
  title: "Navigation Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    separator: {
      control: { type: "text" },
      description: "Separator between breadcrumb items",
    },
    lastItemClickable: {
      control: { type: "boolean" },
      description: "Whether the last item should be clickable",
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumb
export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Laptops" },
    ],
  },
};

// Simple two-level breadcrumb
export const TwoLevels: Story = {
  args: {
    items: [{ label: "Home", href: "/" }, { label: "About Us" }],
  },
};

// With click handlers
export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: "Home", href: "/", onClick: fn() },
      { label: "Categories", href: "/categories", onClick: fn() },
      { label: "Books", href: "/categories/books", onClick: fn() },
      { label: "Fiction", onClick: fn() },
    ],
  },
};

// Custom separator
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "User", href: "/user" },
      { label: "Profile", href: "/user/profile" },
      { label: "Settings" },
    ],
    separator: ">",
  },
};

// Custom separator component
export const CustomSeparatorComponent: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
      { label: "Project Alpha", href: "/projects/alpha" },
      { label: "Tasks" },
    ],
    separator: (
      <span style={{ margin: "0 4px", color: "#6c757d" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </span>
    ),
  },
};

// All items clickable
export const AllItemsClickable: Story = {
  args: {
    items: [
      { label: "Store", href: "/" },
      { label: "Electronics", href: "/electronics" },
      { label: "Smartphones", href: "/electronics/smartphones" },
      {
        label: "iPhone 15 Pro",
        href: "/electronics/smartphones/iphone-15-pro",
      },
    ],
    lastItemClickable: true,
  },
};

// Without links (onClick only)
export const WithoutLinks: Story = {
  args: {
    items: [
      { label: "Level 1", onClick: fn() },
      { label: "Level 2", onClick: fn() },
      { label: "Level 3", onClick: fn() },
      { label: "Current Page" },
    ],
  },
};

// Custom styled items
export const CustomStyledItems: Story = {
  args: {
    items: [
      {
        label: "Home",
        href: "/",
        className: "home-breadcrumb",
      },
      {
        label: "Documentation",
        href: "/docs",
        className: "docs-breadcrumb",
      },
      {
        label: "API Reference",
        className: "api-breadcrumb",
      },
    ],
    className: "custom-breadcrumb-nav",
  },
};

// Long breadcrumb trail
export const LongTrail: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Computers", href: "/products/electronics/computers" },
      { label: "Laptops", href: "/products/electronics/computers/laptops" },
      {
        label: "Gaming Laptops",
        href: "/products/electronics/computers/laptops/gaming",
      },
      { label: "ASUS ROG Strix" },
    ],
  },
};

// Single item
export const SingleItem: Story = {
  args: {
    items: [{ label: "Home", href: "/" }],
  },
};

// Empty breadcrumb
export const Empty: Story = {
  args: {
    items: [],
  },
};

// Icon separator
export const IconSeparator: Story = {
  args: {
    items: [
      { label: "Files", href: "/files" },
      { label: "Documents", href: "/files/documents" },
      { label: "Reports", href: "/files/documents/reports" },
      { label: "Q4 2024 Report.pdf" },
    ],
    separator: "→",
  },
};
