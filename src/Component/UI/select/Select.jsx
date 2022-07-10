import React from "react";

const Select = ({ onChange, value, defaultValue, options }) => {
  return (
    <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}>
      <option disabled value="">{defaultValue}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
