import React from "react";
import "./InputField.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  error,
  helperText,
  className = "",
  ...inputProps
}) => {
  return (
    <div className="input-field-wrapper">
      <label htmlFor={name} className="input-field-label">
        {label}
        {inputProps.required && <span className="required-asterisk">*</span>}
      </label>
      <input
        id={name}
        name={name}
        className={`input-field ${
          error ? "input-field--error" : ""
        } ${className}`}
        {...inputProps}
      />
      {error && <span className="input-field-error">{error}</span>}
      {helperText && !error && (
        <span className="input-field-helper">{helperText}</span>
      )}
    </div>
  );
};
