import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const RadioButtonGroup = ({ options, defaultValue, name, title, value, onChange }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <RadioGroup
        value={value} // Enlaza el valor actual
        onChange={onChange} // Dispara el evento onChange
        row
        className="flex space-x-4 mt-2"
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />}
            label={<span className="text-white">{option.label}</span>}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioButtonGroup;
