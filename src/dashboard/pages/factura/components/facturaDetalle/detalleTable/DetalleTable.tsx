import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDetalleTable } from "./hooks/useDetalleTable";

export const DetalleTable = () => {
  const { rows } = useDetalleTable();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell>U. Medida</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Concepto</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.cantidad}
              </TableCell>
              <TableCell>{row.uMedida}</TableCell>
              <TableCell>{row.codigo}</TableCell>
              <TableCell>{row.concepto}</TableCell>
              <TableCell>{row.precio}</TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>
                <Tooltip title="Eliminar">
                  <IconButton
                    color="error"
                    edge="start"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
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
