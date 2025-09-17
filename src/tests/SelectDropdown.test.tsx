import { SelectDropdown } from "../components/SelectDropdown";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("SelectDropdown", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders with default props", () => {
    render(<SelectDropdown label="Choices" name="choices" options={options} />);
    expect(screen.getByLabelText("Choices")).toBeInTheDocument();
  });

  it("renders with provided value", () => {
    render(
      <SelectDropdown
        label="Options"
        name="options"
        options={options}
        value="option2"
      />
    );
    const select = screen.getByLabelText("Options") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("option2");
  });

  it("calls onChange handler when selection changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <SelectDropdown
        label="Select"
        name="select"
        options={options}
        value=""
        onChange={handleChange}
      />
    );
    const select = screen.getByLabelText("Select");
    await user.selectOptions(select, "option3");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("selection changes on user input", async () => {
    const user = userEvent.setup();
    const Component = () => {
      const [value, setValue] = React.useState("");
      return (
        <SelectDropdown
          label="Fruits"
          name="fruits"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    render(<Component />);
    const select = screen.getByLabelText("Fruits") as HTMLSelectElement;
    await user.selectOptions(select, "option1");
    expect(select.value).toBe("option1");
  });

  it("can be disabled", () => {
    render(
      <SelectDropdown
        label="Disabled Select"
        name="disabledSelect"
        options={options}
        disabled={true}
      />
    );
    const select = screen.getByLabelText(
      "Disabled Select"
    ) as HTMLSelectElement;
    expect(select).toBeDisabled();
  });
});
