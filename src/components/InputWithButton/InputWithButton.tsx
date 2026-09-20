import { type ChangeEvent, type KeyboardEvent } from "react";

import "./InputWithButton.css";

interface InputWithButtonProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  buttonLabel: string;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  rounded?: boolean;
  className?: string;
}

function InputWithButton({
  value,
  onChange,
  onButtonClick,
  buttonLabel,
  placeholder,
  onKeyDown,
  error,
  rounded = false,
  className = "",
}: InputWithButtonProps) {
  const inputClassName = `input-with-button__input${
    error ? " input-with-button__input--error" : ""
  }${rounded ? " input-with-button__input--rounded" : ""}${
    className ? ` ${className}` : ""
  }`;

  const buttonClassName = `input-with-button__button${
    rounded ? " input-with-button__button--rounded" : ""
  }`;

  return (
    <div className="input-with-button">
      <div className="input-with-button__content">
        <input
          type="text"
          className={inputClassName}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        <button className={buttonClassName} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </div>
      {error && <div className="input-with-button__error">{error}</div>}
    </div>
  );
}

export default InputWithButton;
