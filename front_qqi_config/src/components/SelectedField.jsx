import React from 'react';

const SelectField = ({ label, options, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
