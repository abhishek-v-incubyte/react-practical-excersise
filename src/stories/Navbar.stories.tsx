import type { Meta, StoryObj } from "@storybook/react";
import { fn, within, userEvent } from "@storybook/test";
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
      { label: "Home", href: "/", onClick: fn() },
      { label: "About", href: "/about", onClick: fn() },
      { label: "Services", href: "/services", onClick: fn() },
      { label: "Contact", href: "/contact", onClick: fn() },
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
      { label: "Dashboard", href: "/dashboard", onClick: fn() },
      { label: "Projects", href: "/projects", onClick: fn() },
      { label: "Team", href: "/team", onClick: fn() },
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
      { label: "Home", href: "/", onClick: fn() },
      { label: "Features", href: "/features", onClick: fn() },
      { label: "Pricing", href: "/pricing", onClick: fn() },
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
      { label: "Overview", href: "/overview", onClick: fn() },
      { label: "Analytics", href: "/analytics", onClick: fn() },
      { label: "Reports", href: "/reports", onClick: fn() },
      { label: "Settings", href: "/settings", onClick: fn() },
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
      { label: "Explore", href: "/explore", onClick: fn() },
      { label: "Create", href: "/create", onClick: fn() },
      { label: "Share", href: "/share", onClick: fn() },
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

// With active link - Desktop
export const WithActiveLink: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
      href: "/",
    },
    navLinks: [
      { label: "Home", href: "/", active: true, onClick: fn() },
      { label: "About", href: "/about", onClick: fn() },
      { label: "Services", href: "/services", onClick: fn() },
      { label: "Contact", href: "/contact", onClick: fn() },
    ],
    userMenu: {
      username: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  },
};

// Multiple navigation levels with active state
export const ComplexNavWithActiveState: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Company Logo",
      href: "/",
    },
    navLinks: [
      { label: "Dashboard", href: "/dashboard", onClick: fn() },
      { label: "Projects", href: "/projects", active: true, onClick: fn() },
      { label: "Analytics", href: "/analytics", onClick: fn() },
      { label: "Team", href: "/team", onClick: fn() },
      { label: "Settings", href: "/settings", onClick: fn() },
    ],
    userMenu: {
      username: "Project Manager",
      avatar: "https://i.pravatar.cc/150?img=12",
      menuItems: [
        { label: "Profile", onClick: fn() },
        { label: "Notifications", onClick: fn() },
        { label: "Help", onClick: fn() },
        { label: "Sign Out", onClick: fn() },
      ],
    },
  },
};

// Mobile view simulation
export const MobileView: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Mobile Logo",
      href: "/",
    },
    navLinks: [
      { label: "Home", href: "/", onClick: fn() },
      { label: "Products", href: "/products", onClick: fn() },
      { label: "About", href: "/about", onClick: fn() },
      { label: "Contact", href: "/contact", onClick: fn() },
    ],
    userMenu: {
      username: "Mobile User",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
    docs: {
      description: {
        story:
          "This story simulates the navbar on mobile devices. The navigation links will be hidden and accessible through a hamburger menu.",
      },
    },
  },
};

// Tablet view
export const TabletView: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Tablet Logo",
      href: "/",
    },
    navLinks: [
      { label: "Home", href: "/", active: true, onClick: fn() },
      { label: "Services", href: "/services", onClick: fn() },
      { label: "Portfolio", href: "/portfolio", onClick: fn() },
      { label: "Blog", href: "/blog", onClick: fn() },
      { label: "Contact", href: "/contact", onClick: fn() },
    ],
    userMenu: {
      username: "Tablet User",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "ipad",
    },
    docs: {
      description: {
        story:
          "This story shows the navbar on tablet devices with responsive behavior.",
      },
    },
  },
};

// Mobile menu open state
export const MobileMenuOpen: Story = {
  args: {
    logo: {
      src: "https://playbook.incubyte.co/img/logo.jfif",
      alt: "Mobile Logo",
      href: "/",
    },
    navLinks: [
      { label: "Home", href: "/", active: true, onClick: fn() },
      { label: "Products", href: "/products", onClick: fn() },
      { label: "Services", href: "/services", onClick: fn() },
      { label: "About", href: "/about", onClick: fn() },
      { label: "Contact", href: "/contact", onClick: fn() },
    ],
    userMenu: {
      username: "Mobile User",
      avatar: "https://i.pravatar.cc/150?img=15",
      menuItems: [
        { label: "Profile", onClick: fn() },
        { label: "Settings", onClick: fn() },
        { label: "Logout", onClick: fn() },
      ],
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
    docs: {
      description: {
        story:
          "This story shows the mobile menu in its open state. The hamburger menu would be clicked to show the navigation overlay.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate clicking the mobile menu button
    const mobileMenuButton = await canvas.findByLabelText(
      "Toggle navigation menu"
    );
    if (mobileMenuButton) {
      await userEvent.click(mobileMenuButton);
    }
  },
};
