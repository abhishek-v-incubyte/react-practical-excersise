import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Checkbox } from "../components/Checkbox";

const meta = {
  title: "Example/Checkbox",
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary story
export const Primary: Story = {
  args: {
    label: "Accept Terms and Conditions",
    name: "terms",
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "I agree to the terms and conditions",
    name: "terms",
    error: "You must accept the terms to continue",
  },
};

// Checked state
export const Checked: Story = {
  args: {
    label: "Remember me",
    name: "remember",
    checked: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled option",
    name: "disabled",
    disabled: true,
  },
};

// Disabled and checked
export const DisabledChecked: Story = {
  args: {
    label: "Locked selection",
    name: "locked",
    disabled: true,
    checked: true,
  },
};
