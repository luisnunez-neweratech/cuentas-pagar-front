import { Autocomplete, FormControl, TextField } from "@mui/material";

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
    <FormControl fullWidth size="small" error={touched && Boolean(errors)}>
      <Autocomplete
        id={id}
        size="small"
        disablePortal
        options={options}
        value={value}
        onChange={(_event, newValue) => setFieldValue(id, newValue)}
        onBlur={handleBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={touched && Boolean(errors)}
            helperText={touched && errors?.toString()}
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
};
