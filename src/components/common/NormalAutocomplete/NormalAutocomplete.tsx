import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

interface props {
  options: any[];
  label: string;
  id: string;
  value?: any;
  setFieldValue?: any;
  handleBlur?: (value: any) => void;
  touched?: any;
  errors?: any;
}

export const NormalAutocomplete = ({
  options,
  label,
  id,
  value,
  setFieldValue,
  handleBlur,
  touched,
  errors,
}: props) => {
  return (
    <FormControl
      fullWidth
      size="small"
      error={touched[id] && Boolean(errors[id])}
    >
      <Autocomplete
        id={id}
        size="small"
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
        onChange={(_event, newValue) => setFieldValue(id, newValue)}
        onBlur={handleBlur}
      />
      <FormHelperText>{touched[id] && errors[id]?.toString()}</FormHelperText>
    </FormControl>
  );
};
