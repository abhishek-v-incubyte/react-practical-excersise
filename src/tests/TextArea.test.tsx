import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextArea } from "../components/TextArea";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("TextArea", () => {
  it("renders with default props", () => {
    render(<TextArea label="Name" name="name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders with provided type and value", () => {
    render(<TextArea label="Email" name="email" value="a@a.com" />);
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("a@a.com");
  });

  it("calls onChange handler when input changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <TextArea
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
        <TextArea
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

  it("can be disabled", () => {
    render(<TextArea label="Disabled Field" name="disabled" disabled={true} />);
    const input = screen.getByLabelText("Disabled Field") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  // TextArea-specific tests:

  it("renders with rows and cols attributes", () => {
    render(
      <TextArea label="Description" name="description" rows={5} cols={30} />
    );
    const textarea = screen.getByLabelText(
      "Description"
    ) as HTMLTextAreaElement;
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("cols", "30");
  });

  it("supports multiline input", async () => {
    const user = userEvent.setup();
    render(<TextArea label="Comments" name="comments" />);
    const textarea = screen.getByLabelText("Comments");

    await user.type(textarea, "Line 1{enter}Line 2{enter}Line 3");
    expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
  });

  it("respects maxLength attribute", () => {
    render(<TextArea label="Limited" name="limited" maxLength={100} />);
    const textarea = screen.getByLabelText("Limited") as HTMLTextAreaElement;
    expect(textarea).toHaveAttribute("maxLength", "100");
  });

  it("supports resize property", () => {
    render(
      <TextArea label="No Resize" name="noresize" style={{ resize: "none" }} />
    );
    const textarea = screen.getByLabelText("No Resize");
    expect(textarea).toHaveStyle({ resize: "none" });
  });

  it("handles placeholder text", () => {
    render(
      <TextArea
        label="Message"
        name="message"
        placeholder="Enter your message here..."
      />
    );
    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute(
      "placeholder",
      "Enter your message here..."
    );
  });
});
