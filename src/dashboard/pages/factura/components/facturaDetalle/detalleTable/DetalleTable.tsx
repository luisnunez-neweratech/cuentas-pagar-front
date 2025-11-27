import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDetalleTable } from "./hooks/useDetalleTable";
import { RowDetalle } from "./components/rowDetalle/RowDetalle";


export const DetalleTable = () => {
  const { rows } = useDetalleTable();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
            <RowDetalle key={row.id} id={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
