import {
  InputLabel,
  Select,  
  FormHelperText,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

interface props {
  id: string;
  label: string;
}

export const SelectCommon = ({ id, label }: props) => {
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
        {/* <MenuItem value={0}>Factura</MenuItem> */}
      </Select>
      <FormHelperText>
        {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
      </FormHelperText>
    </FormControl>
  );
};
