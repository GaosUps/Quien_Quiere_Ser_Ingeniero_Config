import React from 'react';

const InputField = ({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
