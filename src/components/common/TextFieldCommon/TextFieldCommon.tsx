import { TextField, InputAdornment } from "@mui/material";


interface props {
  id: string;
  label: string;
  value?: any;
  handleChange?: (value: any) => void;
  typeMoneda: boolean;
}

export const TextFieldCommon = ({
  id,
  label,
  value,
  handleChange,
  typeMoneda,
}: props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      size="small"
      type={typeMoneda ? "tel" : "text"}
      fullWidth
      id={id}
      label={label}
      name={id}
      sx={{ marginTop: 0 }}
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          style: { textAlign: typeMoneda ? "right" : "left" },
          startAdornment: typeMoneda ? (
            <InputAdornment position="start">
              $
            </InputAdornment>
          ) : null,
        },        
        htmlInput: {
          style: { textAlign: typeMoneda ? "right" : "left" },
        },
      }}
    />
  );
};
