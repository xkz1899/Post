import React from "react";

const Select = ({ onChange, value, defaultValue, options }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option disabled>{defaultValue}</option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
