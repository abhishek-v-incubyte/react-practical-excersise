import React from "react";

interface SelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  name,
  options,
  ...selectProps
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...selectProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
