import { Checkbox } from "../components/Checkbox";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("Checkbox", () => {
  it("renders with default props", () => {
    render(<Checkbox label="Accept Terms" name="terms" />);
    expect(screen.getByLabelText("Accept Terms")).toBeInTheDocument();
  });

  it("renders with provided checked value", () => {
    render(<Checkbox label="Subscribe" name="subscribe" checked={true} />);
    const checkbox = screen.getByLabelText("Subscribe") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(true);
  });

  it("calls onChange handler when checkbox is toggled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Checkbox
        label="Agree"
        name="agree"
        checked={false}
        onChange={handleChange}
      />
    );
    const checkbox = screen.getByLabelText("Agree");
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("checkbox state changes on user input", async () => {
    const user = userEvent.setup();
    const Component = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <Checkbox
          label="Enable Feature"
          name="feature"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    };
    render(<Component />);
    const checkbox = screen.getByLabelText(
      "Enable Feature"
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it("can be disabled", () => {
    render(<Checkbox label="Disabled" name="disabled" disabled={true} />);
    const checkbox = screen.getByLabelText("Disabled") as HTMLInputElement;
    expect(checkbox).toBeDisabled();
  });
});
