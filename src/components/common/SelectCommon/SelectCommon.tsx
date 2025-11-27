import { InputLabel, Select, FormHelperText, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";

interface props {
  id: string;
  label: string;
  options: any[];
}

export const SelectCommon = ({ id, label, options }: props) => {
  return (
    <FormControl
      fullWidth
      size="small"
      //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        label={label}
        //value={values.tipoEntidad}
        //onChange={handleChange}
        //onBlur={handleBlur}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
      </FormHelperText>
    </FormControl>
  );
};
