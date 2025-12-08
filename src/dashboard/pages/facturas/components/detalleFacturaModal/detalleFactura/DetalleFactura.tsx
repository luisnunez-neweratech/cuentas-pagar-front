import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDetalleFactura } from "./hooks/useDetalleFactura";

export const DetalleFactura = () => {
  const { rows } = useDetalleFactura();

  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <h5 style={{ margin: 0 }}>Detalle</h5>
      </Grid>
      <Grid size={10} />
      <Grid size={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", width: 120 }}>
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
                <TableCell style={{ fontWeight: "bold", width: 150 }}>
                  Precio
                </TableCell>
                <TableCell style={{ fontWeight: "bold", width: 150 }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rows ?? []).map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.quantity}
                  </TableCell>
                  <TableCell>{row.unitOfMeasure}</TableCell>
                  <TableCell>{row.productServiceKey}</TableCell>
                  <TableCell>{row.concept}</TableCell>
                  <TableCell>{row.unitPrice}</TableCell>
                  <TableCell>{row.lineTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
