import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "../components/ProfileCard";

const meta = {
  title: "Components/Cards/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Name of the person",
    },
    avatar: {
      control: "text",
      description: "Avatar image URL",
    },
    role: {
      control: "text",
      description: "Professional role or title",
    },
    bio: {
      control: "text",
      description: "Biography or description",
    },
    socialLinks: {
      description: "Array of social media links",
    },
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: "Jane Smith",
    role: "Software Engineer",
    bio: "Passionate about building scalable web applications and contributing to open source projects.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
};

export const WithSocialLinks: Story = {
  args: {
    name: "John Doe",
    role: "Product Designer",
    bio: "Creating beautiful and functional user experiences. Love minimalist design and typography.",
    avatar: "https://i.pravatar.cc/150?img=3",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
      { platform: "twitter", url: "https://twitter.com/johndoe" },
      { platform: "github", url: "https://github.com/johndoe" },
    ],
  },
};

export const NoAvatar: Story = {
  args: {
    name: "Alex Johnson",
    role: "Marketing Manager",
    bio: "Experienced in digital marketing strategies and brand development. MBA from Wharton.",
  },
};

export const MinimalProfile: Story = {
  args: {
    name: "Sarah Williams",
    bio: "Full-stack developer and tech enthusiast.",
  },
};

export const CompleteProfile: Story = {
  args: {
    name: "Michael Chen",
    role: "Senior UX Researcher",
    bio: "Leading user research initiatives to create data-driven design solutions. PhD in Human-Computer Interaction.",
    avatar: "https://i.pravatar.cc/150?img=5",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/michaelchen" },
      { platform: "twitter", url: "https://twitter.com/mchen_ux" },
    ],
    footer: (
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <button>Contact</button>
        <button>View Portfolio</button>
      </div>
    ),
  },
};

export const TeamMember: Story = {
  args: {
    name: "Emily Rodriguez",
    role: "Team Lead",
    bio: "Building and mentoring high-performing engineering teams.",
    avatar: "https://i.pravatar.cc/150?img=9",
    footer: "Available for consultation",
  },
};
