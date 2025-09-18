import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { InputField } from "../components/InputField";

const meta = {
  title: "Example/InputField",
  component: InputField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary story
export const Primary: Story = {
  args: {
    label: "First Name",
    name: "firstName",
    type: "text",
  },
};

// Email input story
export const Email: Story = {
  args: {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
};

// Password input story
export const Password: Story = {
  args: {
    label: "Password",
    name: "password",
    type: "password",
  },
};

// Required field story
export const Required: Story = {
  args: {
    label: "Required Field",
    name: "required",
    type: "text",
    required: true,
  },
};
