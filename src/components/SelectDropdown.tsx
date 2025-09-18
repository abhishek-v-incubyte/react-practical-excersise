import React from "react";

interface SelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  name,
  options,
  error,
  ...selectProps
}) => {
  return (
    <div className="select-dropdown-wrapper">
      <label htmlFor={name}>
        {label}
        {selectProps.required && <span className="required-asterisk">*</span>}
      </label>
      <select
        id={name}
        name={name}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span
          id={`${name}-error`}
          className="select-dropdown-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};
