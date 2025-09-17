import React from "react";

interface RadioButtonGroupProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  name,
  options,
  value,
  ...fieldsetProps
}) => {
  return (
    <fieldset {...fieldsetProps}>
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value} htmlFor={`${name}-${option.value}`}>
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};
