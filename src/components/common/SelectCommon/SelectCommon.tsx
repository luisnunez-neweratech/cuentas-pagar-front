import { InputLabel, Select, FormHelperText, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";

interface props {
  id: string;
  label: string;
  options: any[];
  value?: any;
  handleChange?: (value: any) => void;
  handleBlur?: (value: any) => void;
  touched?: any;
  errors?: any;
  disable?: boolean;
}

export const SelectCommon = ({
  id,
  label,
  options,
  value,
  handleChange,
  handleBlur,
  touched,
  errors,
  disable = false,
}: props) => {
  return (
    <FormControl
      fullWidth
      size="small"
      error={touched[id] && Boolean(errors[id])}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disable}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{touched[id] && errors[id]?.toString()}</FormHelperText>
    </FormControl>
  );
};
