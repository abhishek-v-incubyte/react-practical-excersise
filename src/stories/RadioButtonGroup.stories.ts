import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { RadioButtonGroup } from "../components/RadioButtonGroup";

const meta = {
  title: "Example/RadioButtonGroup",
  component: RadioButtonGroup,
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
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary story
export const Primary: Story = {
  args: {
    label: "Accept Terms and Conditions",
    name: "terms",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    value: "yes",
  },
};
