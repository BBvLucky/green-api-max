import "./InputWithButton.css";

interface InputWithButtonProps extends React.ComponentPropsWithoutRef<"input"> {
  onButtonClick: () => void;
  buttonLabel: string;
  error?: string;
  rounded?: boolean;
  className?: string;
  inputDisabled?: boolean;
  btnDisabled?: boolean;
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
  btnDisabled,
  inputDisabled,
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
          disabled={inputDisabled}
        />
        <button
          className={buttonClassName}
          onClick={onButtonClick}
          disabled={btnDisabled}
        >
          {buttonLabel}
        </button>
      </div>
      {error && <div className="input-with-button__error">{error}</div>}
    </div>
  );
}

export default InputWithButton;
