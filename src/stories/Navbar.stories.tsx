import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Navbar } from "../components/Navbar";

const meta = {
  title: "Navigation Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default navbar
export const Default: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
    },
    navLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
    userMenu: {
      username: "John Doe",
    },
  },
};

// With clickable logo
export const WithClickableLogo: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
      href: "/",
    },
    navLinks: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
      { label: "Team", href: "/team" },
    ],
    userMenu: {
      username: "Jane Smith",
    },
  },
};

// With user dropdown
export const WithUserDropdown: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
    },
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
    userMenu: {
      username: "Admin User",
      menuItems: [
        { label: "Profile", onClick: fn() },
        { label: "Settings", onClick: fn() },
        { label: "Help", onClick: fn() },
        { label: "Logout", onClick: fn() },
      ],
    },
  },
};

// With avatar
export const WithAvatar: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
      href: "/",
    },
    navLinks: [
      { label: "Overview", href: "/overview" },
      { label: "Analytics", href: "/analytics" },
      { label: "Reports", href: "/reports" },
      { label: "Settings", href: "/settings" },
    ],
    userMenu: {
      username: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=32",
      menuItems: [
        { label: "My Account", onClick: fn() },
        { label: "Preferences", onClick: fn() },
        { label: "Sign Out", onClick: fn() },
      ],
    },
  },
};

// With nav click handlers
export const WithNavHandlers: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
    },
    navLinks: [
      { label: "Home", href: "/", onClick: fn() },
      { label: "Products", href: "/products", onClick: fn() },
      { label: "Solutions", href: "/solutions", onClick: fn() },
      { label: "Support", href: "/support", onClick: fn() },
    ],
    userMenu: {
      username: "Developer",
      menuItems: [
        { label: "Documentation", onClick: fn() },
        { label: "API Keys", onClick: fn() },
        { label: "Logout", onClick: fn() },
      ],
    },
  },
};

// Custom styled
export const CustomStyled: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
    },
    navLinks: [
      { label: "Explore", href: "/explore" },
      { label: "Create", href: "/create" },
      { label: "Share", href: "/share" },
    ],
    userMenu: {
      username: "Creative User",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    className: "custom-navbar-style",
  },
};

// Minimal navbar
export const Minimal: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Minimal Logo",
    },
    navLinks: [],
    userMenu: {
      username: "User",
    },
  },
};
