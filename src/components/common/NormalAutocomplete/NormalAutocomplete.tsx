import { Autocomplete, TextField } from "@mui/material";

interface props {
  options: any[];
  label: string;
  id: string;
  value?: any;
  setFieldValue?: any;
}

export const NormalAutocomplete = ({
  options,
  label,
  id,
  value,
  setFieldValue,
}: props) => {
  return (
    <Autocomplete
      id={id}
      size="small"
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
      onChange={(_event, newValue) => setFieldValue(id, newValue)}
    />
  );
};
