import { type ChangeEvent } from "react";

import "./InputWithLabel.css";

interface InputWithLabelProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  className?: string;
}

function InputWithLabel({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: InputWithLabelProps) {
  return (
    <div className="input-with-label">
      <label htmlFor={id} className="input-with-label__label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`input-with-label__input${className ? ` ${className}` : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputWithLabel;
