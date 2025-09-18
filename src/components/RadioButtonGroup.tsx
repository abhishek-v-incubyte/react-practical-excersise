import React from "react";

interface RadioButtonGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  disabled,
  required,
  className,
  error,
}) => {
  return (
    <div className="radio-group-wrapper">
      <fieldset
        className={className}
        disabled={disabled}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <legend>
          {label}
          {required && <span className="required-asterisk">*</span>}
        </legend>
        {options.map((option) => (
          <label key={option.value} htmlFor={`${name}-${option.value}`}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
            />
            {option.label}
          </label>
        ))}
      </fieldset>
      {error && (
        <span id={`${name}-error`} className="radio-group-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
