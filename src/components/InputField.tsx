import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  ...inputProps
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...inputProps} />
    </div>
  );
};
