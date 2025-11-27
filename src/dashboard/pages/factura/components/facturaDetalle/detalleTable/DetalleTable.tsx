import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDetalleTable } from "./hooks/useDetalleTable";

export const DetalleTable = () => {
  const { rows, handleInputChange, deleteRowFactura } = useDetalleTable();

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", width: 80 }}>
              Cantidad
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: 200 }}>
              U. Medida
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: 120 }}>
              Código
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: 300 }}>
              Concepto
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: 130 }}>
              Precio
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: 130 }}>
              Total
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows ?? []).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <TextField
                  value={row.cantidad}
                  onChange={(e) => handleInputChange(e, row.id, "cantidad")}
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
                  value={row.uMedida}
                  onChange={(e) => handleInputChange(e, row.id, "uMedida")}
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
                  value={row.codigo}
                  onChange={(e) => handleInputChange(e, row.id, "codigo")}
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
                  value={row.concepto}
                  onChange={(e) => handleInputChange(e, row.id, "concepto")}
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
                  value={row.precio}
                  onChange={(e) => handleInputChange(e, row.id, "precio")}
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
                  value={row.total}
                  onChange={(e) => handleInputChange(e, row.id, "total")}
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
                    onClick={() => deleteRowFactura(row.id)}
                    sx={{ marginLeft: 3 }}
                  >
                    <DeleteIcon style={{ width: 32, height: 32 }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
