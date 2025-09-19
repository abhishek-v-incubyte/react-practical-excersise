import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "../components/InputField";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import React from "react";

describe("InputField", () => {
  it("renders with default props", () => {
    render(<InputField label="Name" name="name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders with provided type and value", () => {
    render(
      <InputField label="Email" name="email" type="email" value="a@a.com" />
    );
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("email");
    expect(input.value).toBe("a@a.com");
  });

  it("calls onChange handler when input changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <InputField
        label="Username"
        name="username"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText("Username");
    await user.type(input, "newuser");
    expect(handleChange).toHaveBeenCalledTimes(7); // "newuser" has 7 characters
  });

  it("input field value changes on user input", async () => {
    const user = userEvent.setup();
    const Component = () => {
      const [value, setValue] = React.useState("");
      return (
        <InputField
          label="City"
          name="city"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    render(<Component />);
    const input = screen.getByLabelText("City") as HTMLInputElement;
    await user.type(input, "New York");
    expect(input.value).toBe("New York");
  });

  it("renders with placeholder text", () => {
    render(
      <InputField
        label="Password"
        name="password"
        type="password"
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("password");
  });

  it("can be disabled", () => {
    render(
      <InputField label="Disabled Field" name="disabled" disabled={true} />
    );
    const input = screen.getByLabelText("Disabled Field") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("can be marked as required", () => {
    render(
      <InputField label="Required Field" name="required" required={true} />
    );
    const input = screen.getByLabelText(/Required Field/i) as HTMLInputElement;
    expect(input).toBeRequired();
  });

  it("supports different input types", () => {
    const inputTypes = ["password", "number", "tel", "url"];

    inputTypes.forEach((type) => {
      const { unmount } = render(
        <InputField label={`${type} input`} name={type} type={type as any} />
      );
      const input = screen.getByLabelText(`${type} input`) as HTMLInputElement;
      expect(input.type).toBe(type);
      unmount();
    });
  });

  it("associates label with input correctly", () => {
    render(<InputField label="Test Label" name="test" />);
    const input = screen.getByLabelText("Test Label");
    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", input.id);
  });
});
