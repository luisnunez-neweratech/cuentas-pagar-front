import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import dayjs from "dayjs";

interface props {
  id: string;
  label: string;
}

export const DatePickerCommon = ({ label, id }: props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ width: "100%", marginTop: 0 }}
        //value={fechaAlta ? dayjs(fechaAlta) : null}
        label={label}
        /* onChange={(newValue) =>
                      onChangeFechaAlta(
                        convertDateToFilterFormat(newValue?.toDate())
                      )
                    } */
        format="DD-MM-YYYY"
        slotProps={{
          textField: {
            name: id,
            size: "small",
             sx: {
              "& .MuiPickersInputBase-root": {
                fontSize: "14px", // Target the input text
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Target the label
              },
              fontSize: "14px"
            }, 
          },
          field: { clearable: true },
        }}
      />
    </LocalizationProvider>
  );
};
