import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";

const RoleDropdown = ({ label, value, onChange, error }) => {
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default RoleDropdown;
