import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("RadioButtonGroup", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders with default props", () => {
    render(
      <RadioButtonGroup label="Choices" name="choices" options={options} />
    );
    expect(screen.getByText("Choices")).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it("renders with provided value", () => {
    render(
      <RadioButtonGroup
        label="Options"
        name="options"
        options={options}
        value="option2"
      />
    );
    const radio = screen.getByLabelText("Option 2") as HTMLInputElement;
    expect(radio).toBeInTheDocument();
    expect(radio.checked).toBe(true);
  });

  it("calls onChange handler when selection changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <RadioButtonGroup
        label="Select"
        name="select"
        options={options}
        value=""
        onChange={handleChange}
      />
    );
    const radio = screen.getByLabelText("Option 3");
    await user.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("selection changes on user input", async () => {
    const user = userEvent.setup();
    const Component = () => {
      const [value, setValue] = React.useState("");
      return (
        <RadioButtonGroup
          label="Fruits"
          name="fruits"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    render(<Component />);
    const radio1 = screen.getByLabelText("Option 1") as HTMLInputElement;
    const radio2 = screen.getByLabelText("Option 2") as HTMLInputElement;
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(false);
    await user.click(radio1);
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
    await user.click(radio2);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
  });
  it("can be disabled", () => {
    render(
      <RadioButtonGroup
        label="Disabled Group"
        name="disabledGroup"
        options={options}
        disabled={true}
      />
    );
    options.forEach((option) => {
      const radio = screen.getByLabelText(option.label) as HTMLInputElement;
      expect(radio).toBeDisabled();
    });
  });
});
