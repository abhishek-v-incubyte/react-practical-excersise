import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TextArea } from "../components/TextArea";

const meta = {
  title: "Example/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary story
export const Primary: Story = {
  args: {
    label: "Comments",
    name: "comments",
    placeholder: "Enter your comments here...",
    rows: 4,
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "Description",
    name: "description",
    error: "Description is required",
    rows: 3,
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Bio",
    name: "bio",
    required: true,
    placeholder: "Tell us about yourself",
    rows: 5,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Notes",
    name: "notes",
    disabled: true,
    value: "This field is read-only",
    rows: 3,
  },
};

// With character limit
export const WithMaxLength: Story = {
  args: {
    label: "Short Message",
    name: "message",
    maxLength: 100,
    placeholder: "Max 100 characters",
    rows: 2,
  },
};
