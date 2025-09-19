import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/Card";

const meta = {
  title: "Components/Cards/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the card",
    },
    content: {
      control: "text",
      description: "Content of the card",
    },
    footer: {
      control: "text",
      description: "Footer content of the card",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Basic Card",
    content: "This is a basic card with title and content.",
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    content: "This card has a footer section with actions.",
    footer: (
      <div style={{ display: "flex", gap: "8px" }}>
        <button>Action 1</button>
        <button>Action 2</button>
      </div>
    ),
  },
};

export const ContentOnly: Story = {
  args: {
    content: "This is a card with only content, no title or footer.",
  },
};

export const CompleteCard: Story = {
  args: {
    title: "Complete Card Example",
    content:
      "This card demonstrates all available props including title, content, and footer sections. The card component provides a flexible container for presenting related information.",
    footer: "Card footer information",
  },
};

export const CustomStyling: Story = {
  args: {
    title: "Custom Styled Card",
    content: "This card has custom CSS classes applied.",
    className: "custom-theme-card",
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <div>
        <h3>Custom Content as Children</h3>
        <p>This content is passed as children instead of the content prop.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
};
