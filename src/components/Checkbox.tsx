import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  ...checkboxProps
}) => {
  return (
    <div>
      <label htmlFor={name}>
        <input type="checkbox" id={name} name={name} {...checkboxProps} />
        {label}
      </label>
    </div>
  );
};
