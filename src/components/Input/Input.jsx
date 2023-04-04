/* eslint-disable react/prop-types */
import React from "react";

const Input = ({
  type = "text",
  errorMsg,
  name,
  register,
  containerClassName,
  inputClassName,
  errorClassName,
  placeholder = "",
  rules,
  ...rest
}) => {
  const registerResult = register && name ? register(name, rules) : {};
  return (
    <div className={containerClassName}>
      <input
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
        {...registerResult}
      />
      <div className={errorClassName}>{errorMsg}</div>
    </div>
  );
};

export default Input;
