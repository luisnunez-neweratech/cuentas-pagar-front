import {
  TableRow,
  TableCell,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRowDetalle } from "./hooks/useRowDetalle";

interface props {
  id: number;
}

export const RowDetalle = ({ id }: props) => {
  const { deleteRowFactura, values, handleChange, handleBlur } = useRowDetalle({
    id,
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
          value={values.cantidad}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          size="small"
          fullWidth
          slotProps={{
            input: {
              style: { fontSize: "12px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "12px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="uMedida"
          name="uMedida"
          value={values.uMedida}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined" // Use outlined for better visibility in a table
          size="small" // Make it less bulky
          fullWidth // Optional: makes the TextField take the full width of the cell
          slotProps={{
            input: {
              style: { fontSize: "12px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "12px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="codigo"
          name="codigo"
          value={values.codigo}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined" // Use outlined for better visibility in a table
          size="small" // Make it less bulky
          fullWidth // Optional: makes the TextField take the full width of the cell
          slotProps={{
            input: {
              style: { fontSize: "12px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "12px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="concepto"
          name="concepto"
          value={values.concepto}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined" // Use outlined for better visibility in a table
          size="small" // Make it less bulky
          fullWidth // Optional: makes the TextField take the full width of the cell
          slotProps={{
            input: {
              style: { fontSize: "12px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "12px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="precio"
          name="precio"
          value={values.precio}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined" // Use outlined for better visibility in a table
          size="small" // Make it less bulky
          fullWidth // Optional: makes the TextField take the full width of the cell
          slotProps={{
            input: {
              style: { fontSize: "12px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "12px" },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="total"
          name="total"
          value={values.total}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined" // Use outlined for better visibility in a table
          size="small" // Make it less bulky
          fullWidth // Optional: makes the TextField take the full width of the cell
          slotProps={{
            input: {
              style: { fontSize: "12px" }, // Styles the input element itself
            },
            // Or for the native HTML element
            htmlInput: {
              style: { fontSize: "12px" },
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
