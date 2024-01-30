// CustomInput.jsx
import React from "react";
import { TextField, FormHelperText } from "@mui/material";

const CustomInput = ({ label, variant, error, value, onChange, ...rest }) => {
  const isValidEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <TextField
        label={label}
        variant={variant}
        value={value}
        onChange={onChange}
        fullWidth
        error={Boolean(error)}
        {...rest}
      />
      {error && (
        <FormHelperText style={{ color: "red" }}>
          {error === "email" && !isValidEmail(value)
            ? "Invalid email address"
            : error}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomInput;
