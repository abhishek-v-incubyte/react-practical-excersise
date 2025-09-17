import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  ...textareaProps
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} {...textareaProps} />
    </div>
  );
};
