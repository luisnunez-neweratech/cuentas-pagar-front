import {
  TableRow,
  TableCell,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRowDetalle } from "./hooks/useRowDetalle";
import { NumericFormat } from "react-number-format";

interface props {
  id: number;
  onClickGuardar: number;
}

export const RowDetalle = ({ id, onClickGuardar }: props) => {
  const {
    deleteRowFactura,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setCorrectAmoutValue,
  } = useRowDetalle({
    id,
    onClickGuardar,
  });

  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <TextField
          id="cantidad"
          name="cantidad"
          type="tel"
          value={values.cantidad}
          onChange={(e) => {
            handleChange(e);
            handleSubmit();
          }}
          onBlur={handleBlur}
          variant="outlined"
          size="small"
          fullWidth
          error={touched.cantidad && Boolean(errors.cantidad)}
          slotProps={{
            input: {
              style: { fontSize: "11px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "11px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="uMedida"
          name="uMedida"
          type="tel"
          value={values.uMedida}
          onChange={(e) => {
            handleChange(e);
            handleSubmit();
          }}
          onBlur={handleBlur}
          variant="outlined" // Use outlined for better visibility in a table
          size="small" // Make it less bulky
          fullWidth // Optional: makes the TextField take the full width of the cell
          error={touched.uMedida && Boolean(errors.uMedida)}
          slotProps={{
            input: {
              style: { fontSize: "11px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "11px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="codigo"
          name="codigo"
          value={values.codigo}
          onChange={(e) => {
            handleChange(e);
            handleSubmit();
          }}
          onBlur={handleBlur}
          variant="outlined" // Use outlined for better visibility in a table
          size="small" // Make it less bulky
          fullWidth // Optional: makes the TextField take the full width of the cell
          error={touched.codigo && Boolean(errors.codigo)}
          slotProps={{
            input: {
              style: { fontSize: "11px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "11px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="concepto"
          name="concepto"
          value={values.concepto}
          onChange={(e) => {
            handleChange(e);
            handleSubmit();
          }}
          onBlur={handleBlur}
          style={{ width: 250, marginTop: 4 }}
          error={touched.concepto && Boolean(errors.concepto)}
          maxRows={3}
          multiline
          slotProps={{
            input: {
              style: { fontSize: "11px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "11px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="precio"
          value={values.precio}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "precio");
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.precio && Boolean(errors.precio)}
          helperText={touched.precio && errors.precio?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { fontSize: "11px", textAlign: "right" },
            },
            htmlInput: {
              style: { fontSize: "11px", textAlign: "right" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="total"
          value={values.total}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "total");
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.total && Boolean(errors.total)}
          helperText={touched.total && errors.total?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { fontSize: "11px", textAlign: "right" },
            },
            htmlInput: {
              style: { fontSize: "11px", textAlign: "right" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Tooltip title="Eliminar">
          <IconButton
            color="error"
            edge="start"
            onClick={() => deleteRowFactura(id)}
            sx={{ marginLeft: 3 }}
          >
            <DeleteIcon style={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
