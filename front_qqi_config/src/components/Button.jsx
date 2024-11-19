import React from 'react';


const Button = ({ label, onClick, color }) => (
  <button
    className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
    type="button"
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
