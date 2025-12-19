import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface props {
  id: string;
  label: string;
  fechaValue: string;
  setFieldValue: (field: any, value: any) => void;
  touched?: any;
  errors?: any;
  setFieldTouched?: any;
}

export const DatePickerCommon = ({
  label,
  id,
  fechaValue,
  setFieldValue,
  touched,
  errors,
  setFieldTouched,
}: props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ width: "100%", marginTop: 0 }}
        value={fechaValue ? dayjs(fechaValue) : null}
        label={label}
        onChange={(newValue) => setFieldValue(id, newValue)}
        format="DD-MM-YYYY"
        slotProps={{
          textField: {
            name: id,
            error: touched[id] && Boolean(errors[id]),
            helperText: touched[id] && errors[id],
            onBlur: () => setFieldTouched(id, true),
            size: "small",
            sx: {
              "& .MuiPickersInputBase-root": {
                fontSize: "14px", // Target the input text
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Target the label
              },
              fontSize: "14px",
              width: "100%",
            },
          },
          field: { clearable: true },
        }}
      />
    </LocalizationProvider>
  );
};
