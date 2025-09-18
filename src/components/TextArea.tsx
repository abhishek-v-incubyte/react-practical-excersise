import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  error,
  ...textareaProps
}) => {
  return (
    <div className="textarea-wrapper">
      <label htmlFor={name}>
        {label}
        {textareaProps.required && <span className="required-asterisk">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...textareaProps}
      />
      {error && (
        <span id={`${name}-error`} className="textarea-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
