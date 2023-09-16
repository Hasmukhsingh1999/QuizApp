"use client";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "@/redux/actions";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SelectField = ({ label, options }) => {
  const [value, setvalue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setvalue(e.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Mode":
        dispatch(handleDifficultyChange(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeChange(e.target.value));
        break;
      default:
        return;
    }
  };
  return (
    <Box mt={3} width={"100%"}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {Array.isArray(options) &&
            options.length > 0 &&
            options.map((option) => (
              <MenuItem value={option.id} key={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectField;
