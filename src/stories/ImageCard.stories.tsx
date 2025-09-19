import type { Meta, StoryObj } from "@storybook/react";
import { ImageCard } from "../components/ImageCard";

const meta = {
  title: "Components/Cards/ImageCard",
  component: ImageCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the card",
    },
    image: {
      control: "text",
      description: "Image URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image (accessibility)",
    },
    content: {
      control: "text",
      description: "Content of the card",
    },
    imagePosition: {
      control: "radio",
      options: ["top", "bottom"],
      description: "Position of the image",
    },
    footer: {
      control: "text",
      description: "Footer content",
    },
  },
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopImage: Story = {
  args: {
    title: "Beautiful Landscape",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Mountain landscape with snow peaks",
    content:
      "Experience the breathtaking beauty of mountain landscapes. This stunning view captures the essence of nature at its finest.",
    imagePosition: "top",
  },
};

export const BottomImage: Story = {
  args: {
    title: "Modern Architecture",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    alt: "Modern glass building",
    content:
      "Discover innovative architectural designs that blend functionality with aesthetic appeal.",
    imagePosition: "bottom",
  },
};

export const WithFooterActions: Story = {
  args: {
    title: "Travel Destination",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    alt: "Travel planning with map and passport",
    content: "Plan your next adventure with our comprehensive travel guides.",
    footer: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button>Learn More</button>
        <button>Book Now</button>
      </div>
    ),
  },
};

export const NoImage: Story = {
  args: {
    title: "Text Only Card",
    content:
      "This ImageCard can also function without an image, falling back to a text-only display.",
  },
};

export const LongContent: Story = {
  args: {
    title: "Article Preview",
    image:
      "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&h=300&fit=crop",
    alt: "Person typing on laptop",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    footer: "Published on January 1, 2024",
  },
};
