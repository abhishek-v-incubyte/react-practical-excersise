import React from "react";

interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  onSubmit,
  children,
}) => {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}
    >
      <h2>{title}</h2>
      <form data-testid="form-wrapper" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};
