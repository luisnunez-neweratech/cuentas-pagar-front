import { TextField, InputAdornment } from "@mui/material";

interface props {
  id: string;
  label: string;
  value?: any;
  handleChange?: (value: any) => void;
  typeMoneda: boolean;
  handleBlur?: (value: any) => void;
  touched?: any;
  errors?: any;
}

export const TextFieldCommon = ({
  id,
  label,
  value,
  handleChange,
  typeMoneda,
  handleBlur,
  touched,
  errors,
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
      onBlur={handleBlur}
      error={touched[id] && Boolean(errors[id])}
      helperText={touched[id] && errors[id]?.toString()}
      slotProps={{
        input: {
          style: { textAlign: typeMoneda ? "right" : "left" },
          startAdornment: typeMoneda ? (
            <InputAdornment position="start">$</InputAdornment>
          ) : null,
        },
        htmlInput: {
          style: { textAlign: typeMoneda ? "right" : "left" },
        },
      }}
    />
  );
};
