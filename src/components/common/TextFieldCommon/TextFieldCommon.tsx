import { TextField } from "@mui/material";

interface props {
  id: string;
  label: string;
  value?: any;
  handleChange?: (value: any) => void;
}

export const TextFieldCommon = ({ id, label, value, handleChange }: props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      size="small"
      fullWidth
      id={id}
      label={label}
      name={id}
      sx={{ marginTop: 0 }}
      value={value}
      onChange={handleChange}
    />
  );
};
