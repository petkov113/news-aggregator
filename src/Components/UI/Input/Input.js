import React from "react";
import classes from "./Input.module.css";

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched;
};

const Input = ({
  type,
  label,
  value,
  errorMessage,
  onChange,
  disabled,
  ...props
}) => {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>

      <input
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {isInvalid(props) ? <span>{errorMessage} </span> : "\u00A0"}
    </div>
  );
};

export default Input;
