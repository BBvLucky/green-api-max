import "./InputWithLabel.css";

interface InputWithLabelProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  id: string;
  className?: string;
  error?: string;
}

function InputWithLabel({
  label,
  id,
  className = "",
  error,
  ...otherProps
}: InputWithLabelProps) {
  return (
    <div className="input-with-label">
      <label htmlFor={id} className="input-with-label__label">
        {label}
      </label>
      <input
        id={id}
        className={`input-with-label__input${className ? ` ${className}` : ""}`}
        {...otherProps}
      />
      {error && <span className="input-with-label__error">{error}</span>}
    </div>
  );
}

export default InputWithLabel;
