import { TextField } from "@mui/material";

interface props {
  id: string;
  label: string;
}

export const TextFieldCommon = ({ id, label }: props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      size="small"
      fullWidth
      id={id}
      label={label}
      name={id}
      sx={{marginTop:0}}
      /* value={noFactura}
    onChange={(e) => onChangeNoFactura(e.target.value)} */
    />
  );
};
