import { Autocomplete, TextField } from "@mui/material";

interface props {
  options: any[];
  label: string;
  id: string;
}

export const NormalAutocomplete = ({ options, label, id }: props) => {
  return (
    <Autocomplete
      id={id}
      size="small"
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
