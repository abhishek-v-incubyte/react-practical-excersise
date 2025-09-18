import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  error,
  ...checkboxProps
}) => {
  return (
    <div className="checkbox-wrapper">
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          name={name}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          {...checkboxProps}
        />
        {label}
      </label>
      {error && (
        <span id={`${name}-error`} className="checkbox-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
