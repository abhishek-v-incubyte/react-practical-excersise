import { FormWrapper } from "../components/FormWrapper";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { InputField } from "../components/InputField";

describe("FormWrapper", () => {
  it("renders with default props", () => {
    render(
      <FormWrapper onSubmit={(e) => e.preventDefault()} title="User Info">
        <InputField label="First Name" type="text" name="firstName" />
      </FormWrapper>
    );
    expect(
      screen.getByRole("heading", { name: "User Info" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /first name/i })
    ).toBeInTheDocument();
  });
  it("calls onSubmit handler when form is submitted", async () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      submitted = true;
    };
    let submitted = false;
    render(
      <FormWrapper onSubmit={handleSubmit} title="User Info">
        <InputField label="First Name" type="text" name="firstName" />
      </FormWrapper>
    );
    const form = screen.getByTestId("form-wrapper");
    expect(form).toBeInTheDocument();
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
    expect(submitted).toBe(true);
  });
});
